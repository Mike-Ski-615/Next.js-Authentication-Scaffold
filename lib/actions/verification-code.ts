"use server"

import { prisma } from "@/lib/prisma"
import { registerUser, createSession } from "./user"
import { generateVerificationCode, getExpirationTime } from "@/lib/utils"
import type { AuthFlow, IdentifierType, AuthStep } from "@/prisma/generated/prisma/enums"
import type { ActionResult } from "@/lib/types"

/**
 * Result type for sendVerificationCode action
 */
type SendCodeResult = {
  sent: boolean;
  expiresAt: Date;
};

/**
 * Result type for verifyCode action
 */
type VerifyCodeResult = {
  verified: boolean;
  userId?: string;
  sessionToken?: string;
  remainingAttempts?: number;
};

/**
 * Sends a verification code to the user via email or phone
 * Creates a Verification record in the database with 1-minute expiration
 * 
 * @param identifier - Email address or phone number
 * @param identifierType - Type of identifier (IdentifierType)
 * @param flow - Authentication flow (AuthFlow)
 * @param step - Current step in the flow (AuthStep)
 * @param name - Optional user name (used during sign-up flow)
 * @returns ActionResult with send status and expiration time
 */
export async function sendVerificationCode(
  identifier: string,
  identifierType: IdentifierType,
  flow: AuthFlow,
  step: AuthStep,
  name?: string
): Promise<ActionResult<SendCodeResult>> {
  try {
    // Generate 6-digit verification code
    const code = generateVerificationCode();

    // Calculate expiration time (1 minute from now)
    const expiresAt = getExpirationTime();

    // Create Verification record in database
    const verification = await prisma.verification.create({
      data: {
        identifier,
        identifierType,
        flow,
        step,
        value: code,
        expiresAt,
      },
    });

    // Simulate sending verification code via email/SMS
    // In production, integrate with email service (e.g., SendGrid, AWS SES) or SMS service (e.g., Twilio)
    console.log(`[Verification Code] Sending code to ${identifierType}: ${identifier}`);
    console.log(`[Verification Code] Code: ${code}`);
    console.log(`[Verification Code] Flow: ${flow}, Step: ${step}`);
    console.log(`[Verification Code] Expires at: ${expiresAt.toISOString()}`);
    if (name) {
      console.log(`[Verification Code] User name: ${name}`);
    }

    return {
      success: true,
      data: {
        sent: true,
        expiresAt: verification.expiresAt,
      },
    };
  } catch (error) {
    // Log detailed error for debugging
    console.error("[Verification Code] Error sending code:", error);

    // Return user-friendly error message
    return {
      success: false,
      error: "Failed to send verification code, please try again",
    };
  }
}

/**
 * Verifies a verification code and completes the authentication flow
 * 
 * @param identifier - Email address or phone number
 * @param identifierType - Type of identifier (IdentifierType)
 * @param flow - Authentication flow (AuthFlow)
 * @param step - Current step in the flow (AuthStep)
 * @param code - The 6-digit verification code to verify
 * @param name - Optional user name (required for sign-up flow)
 * @returns ActionResult with verification status, userId, sessionToken, or remainingAttempts
 */
export async function verifyCode(
  identifier: string,
  identifierType: IdentifierType,
  flow: AuthFlow,
  step: AuthStep,
  code: string,
  name?: string
): Promise<ActionResult<VerifyCodeResult>> {
  try {
    // Find the latest unused and unexpired verification code
    const verification = await prisma.verification.findFirst({
      where: {
        identifier,
        identifierType,
        flow,
        step,
        usedAt: null, // Not used yet
      },
      orderBy: {
        createdAt: 'desc', // Get the most recent one
      },
    });

    // If no verification code found
    if (!verification) {
      return {
        success: false,
        error: "Verification code does not exist or has expired, please resend",
      };
    }

    // Check if verification code is expired
    const now = new Date();
    if (now > verification.expiresAt) {
      return {
        success: false,
        error: "Verification code has expired, please resend",
      };
    }

    // Check if verification code has been used
    if (verification.usedAt) {
      return {
        success: false,
        error: "Verification code has been used, please resend",
      };
    }

    // Check if attempt count exceeds threshold (5 attempts)
    if (verification.attemptCount >= 5) {
      return {
        success: false,
        error: "Verification code has expired, please resend",
      };
    }

    // Check if the code matches
    if (verification.value !== code) {
      // Increment attempt count
      await prisma.verification.update({
        where: { id: verification.id },
        data: {
          attemptCount: verification.attemptCount + 1,
        },
      });

      const remainingAttempts = 5 - (verification.attemptCount + 1);

      if (remainingAttempts <= 0) {
        return {
          success: false,
          error: "Verification code has expired, please resend",
        };
      }

      return {
        success: false,
        error: `Incorrect verification code, ${remainingAttempts} attempts remaining`,
      };
    }

    // Code is correct! Mark it as used
    await prisma.verification.update({
      where: { id: verification.id },
      data: {
        usedAt: now,
      },
    });

    // Execute flow logic
    let userId: string;

    if (flow === "sign_in") {
      // Find existing user
      const user = identifierType === "email"
        ? await prisma.user.findUnique({ where: { email: identifier } })
        : await prisma.user.findUnique({ where: { phoneNumber: identifier } });

      if (!user) {
        return {
          success: false,
          error: "User does not exist",
        };
      }

      userId = user.id;
    } else {
      // sign-up flow: create new user
      if (!name) {
        return {
          success: false,
          error: "Registration requires providing a name",
        };
      }

      const newUser = await registerUser(identifier, identifierType, name);
      userId = newUser.id;
    }

    // Create session for the user (automatically sets encrypted cookie)
    const session = await createSession(userId)

    return {
      success: true,
      data: {
        verified: true,
        userId,
        sessionToken: session.token,
      },
    }
  } catch (error) {
    // Log detailed error for debugging
    console.error("[Verification Code] Error verifying code:", error);

    // Return user-friendly error message
    return {
      success: false,
      error: "Verification failed, please try again",
    };
  }
}
