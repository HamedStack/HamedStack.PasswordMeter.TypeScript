/**
 * Represents the strength levels of a password.
 */
export type PasswordStrength =
  | 'Invalid'
  | 'Very Weak'
  | 'Weak'
  | 'Good'
  | 'Strong'
  | 'Very Strong'
  | 'Perfect';

/**
* Represents a mapping of score values to corresponding password strength levels.
*/
export type PasswordStrengthScore = {
  [key in number | '_']: PasswordStrength;
};


/**
 * Represents the result of comparing two passwords for their strength.
 */
export type PasswordComparison = {
  /**
   * The score of the old password.
   */
  oldPasswordScore: number;
  /**
   * The score of the new password.
   */
  newPasswordScore: number;
  /**
   * The difference in scores between the old and new passwords.
   */
  difference: number;
  /**
   * The percentage difference in scores between the old and new passwords.
   */
  differencePercentage: number;
};

/**
 * Represents options for calculating the time required to crack a password.
 */
export interface CrackTimeOption {
  /**
   * The number of guesses per second used for the calculation.
   */
  guessesPerSecond?: number;
  /**
   * The number of possible characters in the password.
   */
  possibleCharacters?: number;
}

/**
 * Represents the result of calculating the time required to crack a password.
 */
export interface CrackTimeResult {
  /**
   * The time in seconds required to crack the password.
   */
  seconds: number;
  /**
   * A human-readable description of the crack time.
   */
  description: string;
}

/**
 * Represents options and criteria for password validation and analysis.
 */
export interface PasswordOptions {
  /**
   * The minimum allowed password length.
   */
  minLength?: number;
  /**
   * The maximum allowed password length.
   */
  maxLength?: number;
  /**
   * The minimum number of uppercase letters required in the password.
   */
  uppercaseLettersMinLength?: number;
  /**
   * The minimum number of lowercase letters required in the password.
   */
  lowercaseLettersMinLength?: number;
  /**
   * The minimum number of digits (numbers) required in the password.
   */
  numbersMinLength?: number;
  /**
   * The minimum number of symbols (non-alphanumeric characters) required in the password.
   */
  symbolsMinLength?: number;
  /**
   * An array of characters that must be included in the password.
   */
  include?: string[];
  /**
   * An array of characters that must not be included in the password.
   */
  exclude?: string[];
  /**
   * A character that the password must start with.
   */
  startsWith?: string;
  /**
   * A character that the password must end with.
   */
  endsWith?: string;
  /**
   * An array of characters of which at least one must be included in the password.
   */
  includeOne?: string[];
  /**
   * Custom error messages for different validation criteria.
   */
  customErrorMessages?: {
    /**
     * Error message for an empty password.
     */
    empty?: string;
    /**
     * Error message for a password that is too short.
     */
    tooShort?: string;
    /**
     * Error message for a password that is too long.
     */
    tooLong?: string;
    /**
     * Error message for a password with not enough uppercase letters.
     */
    notEnoughUppercase?: string;
    /**
     * Error message for a password with not enough lowercase letters.
     */
    notEnoughLowercase?: string;
    /**
     * Error message for a password with not enough digits (numbers).
     */
    notEnoughNumbers?: string;
    /**
     * Error message for a password with not enough symbols.
     */
    notEnoughSymbols?: string;
    /**
     * Error message for a password that must include specified characters but doesn't.
     */
    doesNotIncludeAll?: string;
    /**
     * Error message for a password that contains excluded characters.
     */
    containsExcluded?: string;
    /**
     * Error message for a password that does not start with a specified character.
     */
    doesNotStartWith?: string;
    /**
     * Error message for a password that does not end with a specified character.
     */
    doesNotEndWith?: string;
    /**
     * Error message for a password that must contain at least one of the specified characters but doesn't.
     */
    doesNotIncludeOneOf?: string;
  };
}


/**
 * Represents the result of a password analysis, including the computed score and any validation errors.
 */
export interface ScoreResult {
  /**
   * The computed password score.
   */
  score: number;
  /**
   * An array of validation error messages, if any.
   */
  errors: string[];
}

/**
 * Represents different time units for formatting time.
 */
type TimeUnits = {
  millennium: number;
  centuries: number;
  decades: number;
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};


/**
 * Converts a total number of seconds into various time units.
 * @param totalSeconds The total number of seconds to convert.
 * @returns TimeUnits object representing the time units.
 */
function secondsToTimeUnits(totalSeconds: number): TimeUnits {
  const SEC_IN_MIN = 60;
  const SEC_IN_HOUR = SEC_IN_MIN * 60;
  const SEC_IN_DAY = SEC_IN_HOUR * 24;
  const SEC_IN_MONTH = SEC_IN_DAY * 30.44; // Average month length
  const SEC_IN_YEAR = SEC_IN_DAY * 365.25; // Average year length considering leap years
  const SEC_IN_DECADE = SEC_IN_YEAR * 10;
  const SEC_IN_CENTURY = SEC_IN_YEAR * 100;
  const SEC_IN_MILLENNIUM = SEC_IN_YEAR * 1000;

  const millennium = Math.floor(totalSeconds / SEC_IN_MILLENNIUM);
  totalSeconds %= SEC_IN_MILLENNIUM;

  const centuries = Math.floor(totalSeconds / SEC_IN_CENTURY);
  totalSeconds %= SEC_IN_CENTURY;

  const decades = Math.floor(totalSeconds / SEC_IN_DECADE);
  totalSeconds %= SEC_IN_DECADE;

  const years = Math.floor(totalSeconds / SEC_IN_YEAR);
  totalSeconds %= SEC_IN_YEAR;

  const months = Math.floor(totalSeconds / SEC_IN_MONTH);
  totalSeconds %= SEC_IN_MONTH;

  const days = Math.floor(totalSeconds / SEC_IN_DAY);
  totalSeconds %= SEC_IN_DAY;

  const hours = Math.floor(totalSeconds / SEC_IN_HOUR);
  totalSeconds %= SEC_IN_HOUR;

  const minutes = Math.floor(totalSeconds / SEC_IN_MIN);
  totalSeconds %= SEC_IN_MIN;

  const seconds = Math.floor(totalSeconds);

  return {
    millennium,
    centuries,
    decades,
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
  };
}

/**
 * Formats a TimeUnits object into a human-readable time description.
 * @param timeUnits TimeUnits object to format.
 * @returns Formatted time description.
 */
function formatTimeUnits(timeUnits: TimeUnits): string {
  if (Object.values(timeUnits).every((value) => value === 0)) {
    return '1 second';
  }

  const nonZeroUnits = Object.entries(timeUnits).filter(
    ([_, value]) => value > 0
  );

  return nonZeroUnits
    .map(([unit, value]) => {
      return `${value} ${singularize(unit, value)}`;
    })
    .join(', ');
}

/**
 * Singularizes a unit name based on the given value.
 * @param unit The unit name.
 * @param value The value associated with the unit.
 * @returns Singularized unit name.
 */
function singularize(unit: string, value: number): string {
  if (value === 1) {
    switch (unit) {
      case 'millenniums':
        return 'millennium';
      case 'centuries':
        return 'century';
      case 'decades':
        return 'decade';
      case 'years':
        return 'year';
      case 'months':
        return 'month';
      case 'days':
        return 'day';
      case 'hours':
        return 'hour';
      case 'minutes':
        return 'minute';
      case 'seconds':
        return 'second';
      default:
        return unit;
    }
  }
  return unit;
}


/**
 * A utility class for analyzing and scoring passwords based on various criteria.
 */
export class PasswordMeter {
  private password: string;
  private options: PasswordOptions;
  private errors: string[];

  /**
 * Creates a new PasswordMeter instance with the given password and options.
 * @param password The password to analyze.
 * @param options (Optional) Password criteria and error messages.
 */
  constructor(password: string, options?: PasswordOptions) {
    this.password = password;
    this.options = options || {};
    this.errors = [];
  }

  private countPattern(pattern: RegExp): number {
    const matches = this.password.match(pattern);
    return matches ? matches.length : 0;
  }

  private numberOfCharacters(): number {
    return this.password.length * 4;
  }

  private uppercaseLetters(): number {
    const n = this.countPattern(/[A-Z]/g);
    return (this.password.length - n) * 2;
  }

  private lowercaseLetters(): number {
    const n = this.countPattern(/[a-z]/g);
    return (this.password.length - n) * 2;
  }

  private numbers(): number {
    const n = this.countPattern(/\d/g);
    return n * 4;
  }

  private symbols(): number {
    const n = this.countPattern(/\W/g);
    return n * 6;
  }

  private middleNumbersOrSymbols(): number {
    if (this.password.length <= 2) return 0;
    const middle = this.password.slice(1, -1);
    const n = (middle.match(/[\d\W]/g) || []).length;
    return n * 2;
  }

  private requirements(): number {
    const conditions = [
      this.password.length >= 8,
      this.countPattern(/[A-Z]/g) > 0,
      this.countPattern(/[a-z]/g) > 0,
      this.countPattern(/\d/g) > 0,
      this.countPattern(/\W/g) > 0,
    ];
    const validConditions = conditions.filter(Boolean).length;
    return validConditions >= 3 ? validConditions * 2 : 0;
  }

  private lettersOnly(): number {
    if (this.password.match(/^[A-Za-z]+$/)) {
      return -this.password.length;
    }
    return 0;
  }

  private numbersOnly(): number {
    if (this.password.match(/^\d+$/)) {
      return -this.password.length;
    }
    return 0;
  }

  private consecutiveUppercaseLetters(): number {
    const n = this.countPattern(/(?=[A-Z]{2})/g);
    return -n * 2;
  }

  private consecutiveLowercaseLetters(): number {
    const n = this.countPattern(/(?=[a-z]{2})/g);
    return -n * 2;
  }

  private consecutiveNumbers(): number {
    const n = this.countPattern(/(?=\d{2})/g);
    return -n * 2;
  }

  private sequentialLetters(): number {
    const n = this.countPattern(
      /(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/gi
    );
    return -n * 3;
  }

  private sequentialNumbers(): number {
    const n = this.countPattern(/(012|123|234|345|456|567|678|789)/g);
    return -n * 3;
  }

  private sequentialSymbols(): number {
    // Assuming a common keyboard layout for symbols
    const n = this.countPattern(
      /(\!\@\#|\@\#\$\|\#\$\%|\$\%\^|\%\^\&|\^\&\*|\&\*\(|\*\(\))/g
    );
    return -n * 3;
  }

  private repeatedCharacters(): number {
    const charMap: { [key: string]: number } = {};
    for (const char of this.password.toLowerCase()) {
      charMap[char] = (charMap[char] || 0) + 1;
    }

    let penalty = 0;
    for (const char in charMap) {
      if (charMap[char] > 1) {
        penalty += charMap[char] ** 2;
      }
    }
    return -penalty;
  }

  private entropy(): number {
    const uniqueChars = [...new Set(this.password)].length;
    const entropy = this.password.length * Math.log2(uniqueChars);
    return Math.round(entropy);
  }

  private datePatterns(): number {
    // DDMMYYYY, MMDDYYYY, YYYYMMDD
    const n1 = this.countPattern(
      /(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[0-2])\d{4}|(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])\d{4}|\d{4}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])/g
    );
    // DDMMYY, MMDDYY, YYMMDD
    const n2 = this.countPattern(
      /(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[0-2])\d{2}|(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])\d{2}|\d{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])/g
    );
    const total = n1 + n2;
    if (total > 0) {
      return -total * 5;
    }
    return 0;
  }

  private keyboardPatterns(): number {
    const patterns = [
      '1234567890',
      '234567890',
      '34567890',
      '4567890',
      '567890',
      '67890',
      '7890',
      '890',
      '0987654321',
      '987654321',
      '87654321',
      '7654321',
      '654321',
      '54321',
      '4321',
      '321',
      'qwertyuiop',
      'wertyuiop',
      'ertyuiop',
      'rtyuiop',
      'tyuiop',
      'yuiop',
      'uiop',
      'iop',
      'op',
      'poiuytrewq',
      'oiuytrewq',
      'iuytrewq',
      'uytrewq',
      'ytrewq',
      'trewq',
      'rewq',
      'ewq',
      'wq',
      'asdfghjkl',
      'sdfghjkl',
      'dfghjkl',
      'fghjkl',
      'ghjkl',
      'hjkl',
      'jkl',
      'lkjhgfdsa',
      'kjhgfdsa',
      'jhgfdsa',
      'hgfdsa',
      'gfdsa',
      'fdsa',
      'dsa',
      'zxcvbnm',
      'xcvbnm',
      'cvbnm',
      'vbnm',
      'bnm',
      'mnbvcxz',
      'nbvcxz',
      'bvcxz',
      'vcxz',
      'cxz',
      '1qaz',
      'qazwsx',
      'azwsxedc',
      '2wsx',
      'wsxedc',
      'sedcrfv',
      'edcrfvtg',
      'dcfvgb',
      '3edc',
      'rfvtgb',
      'fvtgbyhn',
      'vtgbyhnujm',
      '4rfv',
      'fvgb',
      'gbhn',
      'bhnj',
      'hnjm',
      '5tgb',
      '6yhn',
      '7ujm',
      ';/p0',
      '.lo9',
      ',ki8',
      'mj7',
      'nh6',
      'bg5',
      'vf4',
      'cd3',
      'xe2',
      'za1',
      '123456',
      '234567',
      '345678',
      '456789',
      '098765',
      '987654',
      '876543',
      '765432',
      '543210',
      'qwerty',
      'wertyu',
      'ertyui',
      'rtyuio',
      'poiuyt',
      'oiuytr',
      'iuytre',
      'uytrew',
      'asdfgh',
      'sdfghj',
      'dfghjk',
      'lkjhgf',
      'kjhgsd',
      'jhgfsa',
      'hgfasd',
      'zxcvbn',
      'mnbvcx',
      'qwer',
      'asdf',
      'zxcv',
      'poiuy',
    ];
    let count = 0;
    for (const pattern of patterns) {
      const reg = new RegExp(pattern, 'gi');
      if (this.password.match(reg)) {
        count++;
      }
      const reversePattern = pattern.split('').reverse().join('');
      const reverseReg = new RegExp(reversePattern, 'gi');
      if (this.password.match(reverseReg)) {
        count++;
      }
    }
    if (count > 0) {
      return -count * 5;
    }
    return 0;
  }

  private validate(): string[] {
    this.errors = [];
    const msgs = this.options.customErrorMessages || {};

    if (this.password.length == 0) {
      this.errors.push(msgs.empty || 'Password is empty.');
    }

    if (
      this.options.minLength &&
      this.password.length < this.options.minLength
    ) {
      this.errors.push(msgs.tooShort || 'Password is too short.');
    }

    if (
      this.options.maxLength &&
      this.password.length > this.options.maxLength
    ) {
      this.errors.push(msgs.tooLong || 'Password is too long.');
    }

    if (
      this.options.uppercaseLettersMinLength &&
      this.countPattern(/[A-Z]/g) < this.options.uppercaseLettersMinLength
    ) {
      this.errors.push(
        msgs.notEnoughUppercase || 'Not enough uppercase letters.'
      );
    }

    if (
      this.options.lowercaseLettersMinLength &&
      this.countPattern(/[a-z]/g) < this.options.lowercaseLettersMinLength
    ) {
      this.errors.push(
        msgs.notEnoughLowercase || 'Not enough lowercase letters.'
      );
    }

    if (
      this.options.numbersMinLength &&
      this.countPattern(/\d/g) < this.options.numbersMinLength
    ) {
      this.errors.push(msgs.notEnoughNumbers || 'Not enough numbers.');
    }

    if (
      this.options.symbolsMinLength &&
      this.countPattern(/\W/g) < this.options.symbolsMinLength
    ) {
      this.errors.push(msgs.notEnoughSymbols || 'Not enough symbols.');
    }

    if (
      this.options.include &&
      !this.options.include.every((item) => this.password.includes(item))
    ) {
      this.errors.push(
        msgs.doesNotIncludeAll ||
        'Password must include all specified characters.'
      );
    }

    if (
      this.options.exclude &&
      this.options.exclude.some((item) => this.password.includes(item))
    ) {
      this.errors.push(
        msgs.containsExcluded || 'Password contains excluded characters.'
      );
    }

    if (
      this.options.startsWith &&
      !this.password.startsWith(this.options.startsWith)
    ) {
      this.errors.push(
        msgs.doesNotStartWith ||
        'Password does not start with the specified character.'
      );
    }

    if (
      this.options.endsWith &&
      !this.password.endsWith(this.options.endsWith)
    ) {
      this.errors.push(
        msgs.doesNotEndWith ||
        'Password does not end with the specified character.'
      );
    }

    if (
      this.options.includeOne &&
      !this.options.includeOne.some((item) => this.password.includes(item))
    ) {
      this.errors.push(
        msgs.doesNotIncludeOneOf ||
        'Password must contain at least one of the specified characters.'
      );
    }

    return this.errors;
  }

  /**
 * Computes the password score and returns the result.
 * @returns ScoreResult object containing the score and error messages.
 */
  public computeScore(): ScoreResult {
    let score = 0;
    const errors = this.validate();

    if (errors.length > 0) {
      return {
        errors,
        score: -1,
      };
    }

    // Additions
    score += this.numberOfCharacters();
    score += this.uppercaseLetters();
    score += this.lowercaseLetters();
    score += this.numbers();
    score += this.symbols();
    score += this.middleNumbersOrSymbols();
    score += this.requirements();
    score += this.entropy();

    // Deductions
    score += this.lettersOnly();
    score += this.numbersOnly();
    score += this.consecutiveUppercaseLetters();
    score += this.consecutiveLowercaseLetters();
    score += this.consecutiveNumbers();
    score += this.sequentialLetters();
    score += this.sequentialNumbers();
    score += this.sequentialSymbols();
    score += this.repeatedCharacters();
    score += this.datePatterns();
    score += this.keyboardPatterns();

    return {
      score,
      errors,
    };
  }

  /**
 * Calculates the estimated time it would take to crack the password.
 * @param crackTimeOption (Optional) Options for crack time calculation.
 * @returns CrackTimeResult object containing the time in seconds and a description.
 */
  public calculateCrackTime(
    crackTimeOption?: CrackTimeOption
  ): CrackTimeResult {
    crackTimeOption = crackTimeOption || {};
    const guessesPerSecond =
      crackTimeOption?.guessesPerSecond || Math.pow(10, 11) * 5;
    const possibleCharacters = crackTimeOption?.possibleCharacters || 95;
    const passwordLength = this.password.length;
    const combinations = Math.pow(possibleCharacters, passwordLength);
    return {
      seconds: combinations / guessesPerSecond,
      description: formatTimeUnits(
        secondsToTimeUnits(combinations / guessesPerSecond)
      ),
    };
  }

  private isValidPasswordStrengthScore(
    scoreOption: PasswordStrengthScore
  ): boolean {
    const passwordStrengthOrder: PasswordStrength[] = [
      'Invalid',
      'Very Weak',
      'Weak',
      'Good',
      'Strong',
      'Very Strong',
      'Perfect',
    ];
    const sortedKeys = Object.keys(scoreOption)
      .filter((key) => key !== '_')
      .map(Number)
      .sort((a, b) => a - b);
    if (sortedKeys.length + 1 !== passwordStrengthOrder.length) {
      return false;
    }
    for (let i = 0; i < sortedKeys.length; i++) {
      if (scoreOption[sortedKeys[i]] !== passwordStrengthOrder[i + 1]) {
        return false;
      }
    }
    if (scoreOption['_'] !== passwordStrengthOrder[0]) {
      return false;
    }
    return true;
  }

  /**
 * Determines the password strength based on the score and a PasswordStrengthScore configuration.
 * @param score The computed password score.
 * @param scoreOption The PasswordStrengthScore configuration.
 * @returns The password strength level.
 */
  public getStrength(
    score: number,
    scoreOption: PasswordStrengthScore
  ): PasswordStrength {
    if (!this.isValidPasswordStrengthScore(scoreOption)) {
      throw new Error('Invalid PasswordStrengthScore configuration.');
    }
    if (score < 0) {
      return 'Invalid';
    }
    const sortedKeys = Object.keys(scoreOption)
      .filter((key) => key !== '_')
      .map(Number)
      .sort((a, b) => a - b);
    for (let i = 0; i < sortedKeys.length; i++) {
      if (score < sortedKeys[i]) {
        return scoreOption[sortedKeys[i]];
      }
    }
    return scoreOption['_'];
  }


  /**
   * Compares the strength of the current password to a new password.
   * @param newPassword The new password to compare.
   * @returns PasswordComparison object containing the score difference and percentage.
   */
  public comparePassword(newPassword: string): PasswordComparison {
    const oldScore = this.computeScore().score;
    const newScore = new PasswordMeter(
      newPassword,
      this.options
    ).computeScore().score;
    return {
      difference: Number((((newScore - oldScore) / oldScore) * 100).toFixed(2)),
      differencePercentage: Number((newScore / oldScore).toFixed(2)),
      oldPasswordScore: oldScore,
      newPasswordScore: newScore,
    };
  }
}
