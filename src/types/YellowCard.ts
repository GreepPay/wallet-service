// Request types
export type PaymentRequestForm = {
  /**
   * channelId
   * string
   * required
   * The identifier of the specific channel to execute payment through
   */
  channelId: string;
  /**
   * sequenceId
   * string
   * required
   * Represents a unique id for the transaction from your end
   */
  sequenceId: string;
  /**
   * amount
   * int32
   * Amount in USD to transact
   */
  amount?: number;
  /**
   * localAmount
   * int32
   * The amount in local currency to transact
   */
  localAmount?: number;
  /**
   * reason
   * string
   * required
   * The reason for the withdrawal
   */
  reason: string;
  /**
   * sender
   * object
   * required
   * Sender KYC details
   */
  sender: {
    /**
     * name
     * string
     * Sender's Full Name. Required only if customerType is retail.
     */
    name?: string;
    /**
     * country
     * string
     * Sender's country in ISO 3166. Required only if customerType is retail.
     */
    country?: string;
    /**
     * phone
     * string
     * Sender's Phone Number in E.164 format.
     */
    phone?: string;
    /**
     * address
     * string
     * Sender's Address. Required only if customerType is retail.
     */
    address?: string;
    /**
     * dob
     * string
     * Sender's DOB (mm/dd/yyyy). Required only if customerType is retail.
     */
    dob?: string;
    /**
     * email
     * string
     * Sender's Email Address. Required only for certain channels that require sender email.
     */
    email?: string;
    /**
     * idNumber
     * string
     * Sender's national ID number. Required only if customerType is retail.
     */
    idNumber?: string;
    /**
     * idType
     * string
     * Type of ID. Required only if customerType is retail.
     */
    idType?: string;
    /**
     * businessId
     * string
     * Sender business id. Required only if customerType is institution.
     */
    businessId?: string;
    /**
     * businessName
     * string
     * Sender business id. Required only if customerType is institution.
     */
    businessName?: string;
    /**
     * additionalIdType
     * string
     * Sender's additional ID type. Required only if customerType is retail and sender country is Nigeria
     */
    additionalIdType?: string;
    /**
     * additionalIdNumber
     * string
     * Sender's additional ID number. Required only if customerType is retail and sender country is Nigeria
     */
    additionalIdNumber?: string;
  };
  /**
   * destination
   * object
   * required
   * Destination and Recipient Details
   */
  destination: {
    /**
     * accountNumber
     * string
     * required
     * Destination account number
     */
    accountNumber: string;
    /**
     * accountType
     * string
     * required
     * Account type
     */
    accountType: string;
    /**
     * networkId
     * string
     * required
     * Network ID
     */
    networkId: string;
    accountBank?: string;
    networkName?: string;
    country?: string;
    /**
     * accountName
     * string
     * required
     */
    accountName: string;
    phoneNumber?: string;
  };
  /**
   * forceAccept
   * boolean
   * Defaults to false
   * Specify whether or not you want to skip the accept payment step
   */
  forceAccept?: boolean;
  /**
   * customerType
   * string
   * Defaults to retail
   * Determines the type of validation that is performed on the sender. If value is institution, the sender request object will be validated to ensure it includes businessName and businessId parameter. If the value is retail, the sender request object will be validated to ensure it includes name, phone, email, country, address, dob, idNumber and idType.
   */
  customerType?: string;
};

// Request types
export type PaymentCollectionForm = {
  /**
   * channelId
   * string
   * required
   * The identifier of the specific channel to execute payment through
   */
  channelId: string;
  /**
   * sequenceId
   * string
   * required
   * Represents a unique id for the transaction from your end
   */
  sequenceId: string;
  /**
   * amount
   * int32
   * Amount in USD to transact
   */
  amount?: number;
  /**
   * localAmount
   * int32
   * The amount in local currency to transact
   */
  localAmount?: number;
  /**
   * recipient
   * object
   * Recipient's KYC details
   */
  recipient: {
    /**
     * name
     * string
     * Recipient's full name. Required only if customerType is retail.
     */
    name?: string;
    /**
     * country
     * string
     * Recipient's country in ISO 3166 format. Example, Nigeria, Cameroon, Ghana. https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes. Required only if customerType is retail.
     */
    country?: string;
    /**
     * address
     * string
     * Recipient's address. Required only if customerType is retail.
     */
    address?: string;
    /**
     * dob
     * string
     * Recipient's date of birth (mm/dd/yyyy). Required only if customerType is retail.
     */
    dob?: string;
    /**
     * email
     * string
     * Recipient's email address. Required only if customerType is retail.
     */
    email?: string;
    /**
     * idNumber
     * string
     * Recipient's ID number. Required only if customerType is retail.
     */
    idNumber?: string;
    /**
     * idType
     * string
     * Recipient's identity document type. Required only if customerType is retail.
     */
    idType?: string;
    /**
     * additionalIdType
     * string
     * Recipient's additional ID type. Required only if customerType is retail and recipient country is NG
     */
    additionalIdType?: string;
    /**
     * additionalIdNumber
     * string
     * Recipient's additional ID number. Required only if customerType is retail and recipient country is NG
     */
    additionalIdNumber?: string;
    /**
     * phone
     * string
     * Recipient's phone number. Required only if customerType is retail.
     */
    phone?: string;
    /**
     * businessId
     * string
     * Recipient's business id. Required only if customerType is institution.
     */
    businessId?: string;
    /**
     * businessName
     * string
     * Recipient's business name. Required only if customerType is institution.
     */
    businessName?: string;
  };
  /**
   * source
   * object
   * Source account details
   */
  source: {
    /**
     * accountType
     * string
     * required
     * The type of account ('bank' or 'momo')
     */
    accountType: string;
    /**
     * accountNumber
     * string
     * For momo account type, Mobile money phone number of the Recipient. In the sandbox environment use 1111111111 simulate a success source and 0000000000 for a failure source for both "momo" and "bank"
     */
    accountNumber: string;
    /**
     * networkId
     * string
     * The identifier of the specific network to execute payment through (not required for bank collections)
     */
    networkId?: string;
  };
  /**
   * forceAccept
   * boolean
   * Defaults to false
   * Specify whether or not you want to skip the accept collection step
   */
  forceAccept?: boolean;
  /**
   * customerType
   * string
   * Defaults to retail
   * Determines the type of validation that is performed on the recipient. If value is institution, the recipient request object will be validated to ensure it includes businessName and businessId parameter. If the value is retail, the recipient request object will be validated to ensure it includes name, phone, email, country, address, dob, idNumber and idType
   */
  customerType?: string;
  /**
   * redirectUrl
   * string
   * This is used to determine where the customer is redirected to after a transaction is initiated for channels that require redirect. This param is required if the selected channel requires redirect and forceAccept is set to true.
   */
  redirectUrl?: string;
};

// Request types
export type CryptoSettlementForm = {
  /**
   * from
   * int64
   * required
   * Crypto amount
   */
  from: number;
  /**
   * walletAddress
   * string
   * required
   * Recipient wallet address
   */
  walletAddress: string;
  /**
   * cryptoCurrency
   * string
   * required
   * Recipient wallet crypto currency (can be USDC or USDT)
   */
  cryptoCurrency: string;
  /**
   * cryptoNetwork
   * string
   * required
   * Recipient wallet network (can be ERC20, XLM or TRC20)
   */
  cryptoNetwork: string;
  /**
   * sequenceId
   * string
   * Represents a unique id for the transaction from your end
   */
  sequenceId?: string;
};

// Response types
export type SinglePaymentRequestResponse = {
  sender: {
    name: string;
    country: string;
    phone: string;
    address: string;
    dob: string;
    email: string;
    idNumber: string;
    idType: string;
  };
  destination: {
    accountName: string;
    accountNumber: string;
    accountType: string;
    networkId: string;
  };
  channelId: string;
  sequenceId: string;
  amount: number;
  currency: string;
  country: string;
  reason: string;
  partnerId: string;
  id: string;
  status: string;
  sessionId: string;
  convertedAmount: number;
  rate: number;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
};

export type PaymentRequestResponse = {
  id: string;
  channelId: string;
  sequenceId: string;
  currency: string;
  country: string;
  amount: number;
  reason: string;
  convertedAmount: number;
  status: string;
  rate: number;
  sender: {
    name: string;
    country: string;
    phone: string;
    address: string;
    dob: string;
    email: string;
    idNumber: string;
    idType: string;
  };
  destination: {
    accountName: string;
    accountNumber: string;
    accountType: string;
    networkId: string;
  };
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
};

export type PaymentRequestStateResponse = {
  partnerId: string;
  currency: string;
  rate: number;
  status: string;
  createdAt: string;
  sequenceId: string;
  country: string;
  reason: string;
  sender: {
    country: string;
    address: string;
    idType: string;
    phone: string;
    dob: string;
    name: string;
    idNumber: string;
    email: string;
  };
  convertedAmount: number;
  channelId: string;
  expiresAt: string;
  updatedAt: string;
  amount: number;
  destination: {
    networkName: string;
    networkId: string;
    accountNumber: string;
    accountName: string;
    accountType: string;
  };
  id: string;
};

export type SinglePaymentCollectionResponse = {
  recipient: {
    name: string;
    country: string;
    phone: string;
    address: string;
    dob: string;
    email: string;
    idNumber: string;
    idType: string;
  };
  source: {
    accountNumber: string;
    accountType: string;
    networkId: string;
  };
  channelId: string;
  sequenceId: string;
  amount: number;
  currency: string;
  country: string;
  reference?: string;
  depositId?: string;
  partnerId: string;
  apiKey: string;
  id: string;
  status: string;
  convertedAmount: number;
  rate: number;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
};

export type AcceptPaymentCollectionResponse = {
  partnerId: string;
  currency: string;
  rate: number;
  bankInfo: {
    name: string;
    accountNumber: string;
    accountName: string;
  };
  status: string;
  createdAt: string;
  source: {
    accountNumber: string;
    networkId: string;
    accountType: string;
  };
  sequenceId: string;
  country: string;
  reference: string;
  convertedAmount: number;
  recipient: {
    country: string;
    address: string;
    idType: string;
    phone: string;
    dob: string;
    name: string;
    idNumber: string;
    email: string;
  };
  channelId: string;
  expiresAt: string;
  updatedAt: string;
  amount: number;
  id: string;
  depositId: string;
};

export type DenyPaymentCollectionResponse = {
  partnerId: string;
  currency: string;
  rate: number;
  status: string;
  createdAt: string;
  source: {
    accountNumber: string;
    networkId: string;
    accountType: string;
  };
  sequenceId: string;
  country: string;
  convertedAmount: number;
  recipient: {
    country: string;
    address: string;
    idType: string;
    phone: string;
    dob: string;
    name: string;
    idNumber: string;
    email: string;
  };
  channelId: string;
  expiresAt: string;
  updatedAt: string;
  amount: number;
  refundRetry: number;
  id: string;
};

export type CancelPaymentCollectionResponse = {
  partnerId: string;
  currency: string;
  rate: number;
  bankInfo: {
    name: string;
    accountNumber: string;
    accountName: string;
  };
  status: string;
  createdAt: string;
  source: {
    accountNumber: string;
    accountType: string;
  };
  sequenceId: string;
  country: string;
  reference: string;
  convertedAmount: number;
  recipient: {
    country: string;
    address: string;
    idType: string;
    phone: string;
    dob: string;
    name: string;
    idNumber: string;
    email: string;
  };
  channelId: string;
  expiresAt: string;
  updatedAt: string;
  amount: number;
  refundRetry: number;
  id: string;
  depositId: string;
};

export type SingleSettlement = {
  partnerId: string;
  cryptoRate?: number;
  externalWalletAddress: string;
  status: string;
  createdAt: string;
  fiatAmountUSD?: number;
  source: string;
  sequenceId: string;
  cryptoCurrency: string;
  network: string;
  cryptoAmount?: number;
  updatedAt: string;
  provider: string;
  id: string;
  walletBalanceUSD?: number;
  type: string;
};

export type RefundPaymentCollectionResponse = {
  partnerId: string;
  currency: string;
  rate: number;
  bankInfo: {
    name: string;
    accountNumber: string;
    accountName: string;
  };
  status: string;
  createdAt: string;
  source: {
    accountNumber: string;
    accountType: string;
  };
  sequenceId: string;
  country: string;
  reference: string;
  convertedAmount: number;
  recipient: {
    country: string;
    address: string;
    idType: string;
    phone: string;
    dob: string;
    name: string;
    idNumber: string;
    email: string;
  };
  channelId: string;
  expiresAt: string;
  updatedAt: string;
  amount: number;
  refundRetry: number;
  id: string;
  depositId: string;
};

export type PaymentChannel = {
  max: number;
  currency: string;
  countryCurrency: string;
  status: string;
  feeLocal: number;
  createdAt: string;
  vendorId: string;
  country: string;
  widgetStatus: string;
  feeUSD: number;
  min: number;
  channelType: string;
  rampType: string;
  updatedAt: string;
  apiStatus: string;
  settlementType: string;
  estimatedSettlementTime: number;
  id: string;
};

export type PaymentNetwork = {
  code: string;
  updatedAt: string;
  status: string;
  channelIds: string[];
  accountNumberType: string;
  id: string;
  country: string;
  name: string;
  countryAccountNumberType: string;
};

export type WebhookResponse = {
  partnerId: string;
  url: string;
  state: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  id: string;
};

export type ExchangeRate = {
  rates: [
    {
      buy: number;
      sell: number;
      locale: string;
      rateId: string;
      code: string;
      updatedAt: string;
    },
  ];
};

export type AccountDetails = {
  accounts: [
    {
      available: number;
      currency: string;
      currencyType: string;
    },
  ];
};

export type ResolveBankAccountResponse = {
  accountNumber: string;
  accountName: string;
  accountBank: string;
};
