class Device {
  static _isOpera: boolean;
  static _isIE: boolean;
  static _isFirefox: boolean;
  static _isWebKit: boolean;
  static _cachedCssPrefix: string;
  static _cachedPropertyPrefix: string;

  /**
   * Gets the browser's user agent. Using this function allows tests to inject
   * the user agent.
   * Returns the user agent.
   */
  static get userAgent(): string {
    return window.navigator.userAgent;
  }

  /**
   * Determines if the current device is running Opera.
   */
  static get isOpera(): boolean {
    if (this._isOpera == null) {
      this._isOpera = this.userAgent.includes('Opera', 0);
    }
    return this._isOpera;
  }

  /**
   * Determines if the current device is running Internet Explorer.
   */
  static get isIE(): boolean {
    if (this._isIE == null) {
      this._isIE = !this.isOpera && this.userAgent.includes('Trident/', 0);
    }
    return this._isIE;
  }

  /**
   * Determines if the current device is running Firefox.
   */
  static get isFirefox(): boolean {
    if (this._isFirefox == null) {
      this._isFirefox = this.userAgent.includes('Firefox', 0);
    }
    return this._isFirefox;
  }

  /**
   * Determines if the current device is running WebKit.
   */
  static get isWebKit(): boolean {
    if (this._isWebKit == null) {
      this._isWebKit = !this.isOpera && this.userAgent.includes('WebKit', 0);
    }
    return this._isWebKit;
  }

  /**
   * Gets the CSS property prefix for the current platform.
   */
  static get cssPrefix(): string {
    let prefix: string = this._cachedCssPrefix;
    if (prefix != null) {
      return prefix;
    }
    if (this.isFirefox) {
      prefix = '-moz-';
    } else if (this.isIE) {
      prefix = '-ms-';
    } else if (this.isOpera) {
      prefix = '-o-';
    } else {
      prefix = '-webkit-';
    }
    return this._cachedCssPrefix = prefix;
  }

  /**
   * Prefix as used for JS property names.
   */
  static get propertyPrefix(): string {
    let prefix: string = this._cachedPropertyPrefix;
    if (prefix != null) {
      return prefix;
    }
    if (this.isFirefox) {
      prefix = 'moz';
    } else if (this.isIE) {
      prefix = 'ms';
    } else if (this.isOpera) {
      prefix = 'o';
    } else {
      prefix = 'webkit';
    }
    return this._cachedPropertyPrefix = prefix;
  }

  /**
   * Checks to see if the event class is supported by the current platform.
   */
  static isEventTypeSupported(eventType: string): boolean {
    // Browsers throw for unsupported event names.
    try {
      return true;
    } catch (_) {}
    return false;
  }
}
