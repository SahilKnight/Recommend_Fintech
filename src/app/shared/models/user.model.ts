export interface User {
  id: string;
  email: string;
  subscriptionType: 'TRIAL' | 'BASIC' | 'PREMIUM';
  trialEndsAt?: Date;
  createdAt: Date;
  preferences?: {
    riskTolerance: 'LOW' | 'MEDIUM' | 'HIGH';
    preferredSegments: string[];
    notificationSettings: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
  };
}