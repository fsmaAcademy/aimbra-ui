export abstract class KeyCode {
  // These constant names were borrowed from Closure's Keycode enumeration
  // class.
  // http://closure-library.googlecode.com/svn/docs/closure_goog_events_keycodes.js.source.html
  static WIN_KEY_FF_LINUX = 0;
  static MAC_ENTER = 3;
  static BACKSPACE = 8;
  static TAB = 9;
  /** NUM_CENTER is also NUMLOCK for FF and Safari on Mac. */
  static NUM_CENTER = 12;
  static ENTER = 13;
  static SHIFT = 16;
  static CTRL = 17;
  static ALT = 18;
  static PAUSE = 19;
  static CAPS_LOCK = 20;
  static ESC = 27;
  static SPACE = 32;
  static PAGE_UP = 33;
  static PAGE_DOWN = 34;
  static END = 35;
  static HOME = 36;
  static LEFT = 37;
  static UP = 38;
  static RIGHT = 39;
  static DOWN = 40;
  static NUM_NORTH_EAST = 33;
  static NUM_SOUTH_EAST = 34;
  static NUM_SOUTH_WEST = 35;
  static NUM_NORTH_WEST = 36;
  static NUM_WEST = 37;
  static NUM_NORTH = 38;
  static NUM_EAST = 39;
  static NUM_SOUTH = 40;
  static PR_SCREEN = 44;
  static INSERT = 45;
  static NUM_INSERT = 45;
  static DELETE = 46;
  static NUM_DELETE = 46;
  static ZERO = 48;
  static ONE = 49;
  static TWO = 50;
  static THREE = 51;
  static FOUR = 52;
  static FIVE = 53;
  static SIX = 54;
  static SEVEN = 55;
  static EIGHT = 56;
  static NINE = 57;
  static FF_SEMICOLON = 59;
  static FF_EQUALS = 61;
  /**
   * CAUTION: The question mark is for US-keyboard layouts. It varies
   * for other locales and keyboard layouts.
   */
  static QUESTION_MARK = 63;
  static A = 65;
  static B = 66;
  static C = 67;
  static D = 68;
  static E = 69;
  static F = 70;
  static G = 71;
  static H = 72;
  static I = 73;
  static J = 74;
  static K = 75;
  static L = 76;
  static M = 77;
  static N = 78;
  static O = 79;
  static P = 80;
  static Q = 81;
  static R = 82;
  static S = 83;
  static T = 84;
  static U = 85;
  static V = 86;
  static W = 87;
  static X = 88;
  static Y = 89;
  static Z = 90;
  static META = 91;
  static WIN_KEY_LEFT = 91;
  static WIN_KEY_RIGHT = 92;
  static CONTEXT_MENU = 93;
  static NUM_ZERO = 96;
  static NUM_ONE = 97;
  static NUM_TWO = 98;
  static NUM_THREE = 99;
  static NUM_FOUR = 100;
  static NUM_FIVE = 101;
  static NUM_SIX = 102;
  static NUM_SEVEN = 103;
  static NUM_EIGHT = 104;
  static NUM_NINE = 105;
  static NUM_MULTIPLY = 106;
  static NUM_PLUS = 107;
  static NUM_MINUS = 109;
  static NUM_PERIOD = 110;
  static NUM_DIVISION = 111;
  static F1 = 112;
  static F2 = 113;
  static F3 = 114;
  static F4 = 115;
  static F5 = 116;
  static F6 = 117;
  static F7 = 118;
  static F8 = 119;
  static F9 = 120;
  static F10 = 121;
  static F11 = 122;
  static F12 = 123;
  static NUMLOCK = 144;
  static SCROLL_LOCK = 145;

  // OS-specific media keys like volume controls and browser controls.
  static FIRST_MEDIA_KEY = 166;
  static LAST_MEDIA_KEY = 183;

  /**
   * CAUTION: This constant requires localization for other locales and keyboard
   * layouts.
   */
  static SEMICOLON = 186;
  /**
   * CAUTION: This constant requires localization for other locales and keyboard
   * layouts.
   */
  static DASH = 189;
  /**
   * CAUTION: This constant requires localization for other locales and keyboard
   * layouts.
   */
  static EQUALS = 187;
  /**
   * CAUTION: This constant requires localization for other locales and keyboard
   * layouts.
   */
  static COMMA = 188;
  /**
   * CAUTION: This constant requires localization for other locales and keyboard
   * layouts.
   */
  static PERIOD = 190;
  /**
   * CAUTION: This constant requires localization for other locales and keyboard
   * layouts.
   */
  static SLASH = 191;
  /**
   * CAUTION: This constant requires localization for other locales and keyboard
   * layouts.
   */
  static APOSTROPHE = 192;
  /**
   * CAUTION: This constant requires localization for other locales and keyboard
   * layouts.
   */
  static TILDE = 192;
  /**
   * CAUTION: This constant requires localization for other locales and keyboard
   * layouts.
   */
  static SINGLE_QUOTE = 222;
  /**
   * CAUTION: This constant requires localization for other locales and keyboard
   * layouts.
   */
  static OPEN_SQUARE_BRACKET = 219;
  /**
   * CAUTION: This constant requires localization for other locales and keyboard
   * layouts.
   */
  static BACKSLASH = 220;
  /**
   * CAUTION: This constant requires localization for other locales and keyboard
   * layouts.
   */
  static CLOSE_SQUARE_BRACKET = 221;
  static WIN_KEY = 224;
  static MAC_FF_META = 224;
  static WIN_IME = 229;

  /** A sentinel value if the keycode could not be determined. */
  static UNKNOWN = -1;

  /**
   * Returns true if the keyCode produces a (US keyboard) character.
   * Note: This does not (yet) cover characters on non-US keyboards (Russian,
   * Hebrew, etc.).
   */
  static isCharacterKey( keyCode): boolean {
    if ((keyCode >= this.ZERO && keyCode <= this.NINE) ||
        (keyCode >= this.NUM_ZERO && keyCode <= this.NUM_MULTIPLY) ||
        (keyCode >= this.A && keyCode <= this.Z)) {
      return true;
    }

    // Safari sends zero key code for non-latin characters.
    if (Device.isWebKit && keyCode === 0) {
      return true;
    }

    return (keyCode === this.SPACE ||
        keyCode === this.QUESTION_MARK ||
        keyCode === this.NUM_PLUS ||
        keyCode === this.NUM_MINUS ||
        keyCode === this.NUM_PERIOD ||
        keyCode === this.NUM_DIVISION ||
        keyCode === this.SEMICOLON ||
        keyCode === this.FF_SEMICOLON ||
        keyCode === this.DASH ||
        keyCode === this.EQUALS ||
        keyCode === this.FF_EQUALS ||
        keyCode === this.COMMA ||
        keyCode === this.PERIOD ||
        keyCode === this.SLASH ||
        keyCode === this.APOSTROPHE ||
        keyCode === this.SINGLE_QUOTE ||
        keyCode === this.OPEN_SQUARE_BRACKET ||
        keyCode === this.BACKSLASH ||
        keyCode === this.CLOSE_SQUARE_BRACKET);
  }

  /**
   * Experimental helper function for converting keyCodes to keyNames for the
   * keyIdentifier attribute still used in browsers not updated with current
   * spec. This is an imperfect conversion! It will need to be refined, but
   * hopefully it can just completely go away once all the browsers update to
   * follow the DOM3 spec.
   */
  static _convertKeyCodeToKeyName(keyCode): string {
    switch (keyCode) {
      case KeyCode.ALT:
        return keyCode.ALT;
      case KeyCode.BACKSPACE:
        return keyCode.BACKSPACE;
      case KeyCode.CAPS_LOCK:
        return keyCode.CAPS_LOCK;
      case KeyCode.CTRL:
        return keyCode.CONTROL;
      case KeyCode.DELETE:
        return keyCode.DEL;
      case KeyCode.DOWN:
        return keyCode.DOWN;
      case KeyCode.END:
        return keyCode.END;
      case KeyCode.ENTER:
        return keyCode.ENTER;
      case KeyCode.ESC:
        return keyCode.ESC;
      case KeyCode.F1:
        return keyCode.F1;
      case KeyCode.F2:
        return keyCode.F2;
      case KeyCode.F3:
        return keyCode.F3;
      case KeyCode.F4:
        return keyCode.F4;
      case KeyCode.F5:
        return keyCode.F5;
      case KeyCode.F6:
        return keyCode.F6;
      case KeyCode.F7:
        return keyCode.F7;
      case KeyCode.F8:
        return keyCode.F8;
      case KeyCode.F9:
        return keyCode.F9;
      case KeyCode.F10:
        return keyCode.F10;
      case KeyCode.F11:
        return keyCode.F11;
      case KeyCode.F12:
        return keyCode.F12;
      case KeyCode.HOME:
        return keyCode.HOME;
      case KeyCode.INSERT:
        return keyCode.INSERT;
      case KeyCode.LEFT:
        return keyCode.LEFT;
      case KeyCode.META:
        return keyCode.META;
      case KeyCode.NUMLOCK:
        return keyCode.NUM_LOCK;
      case KeyCode.PAGE_DOWN:
        return keyCode.PAGE_DOWN;
      case KeyCode.PAGE_UP:
        return keyCode.PAGE_UP;
      case KeyCode.PAUSE:
        return keyCode.PAUSE;
      case KeyCode.PR_SCREEN:
        return keyCode.PR_SCREEN;
      case KeyCode.RIGHT:
        return keyCode.RIGHT;
      case KeyCode.SCROLL_LOCK:
        return keyCode.SCROLL;
      case KeyCode.SHIFT:
        return keyCode.SHIFT;
      case KeyCode.SPACE:
        return keyCode.SPACEBAR;
      case KeyCode.TAB:
        return keyCode.TAB;
      case KeyCode.UP:
        return keyCode.UP;
      case KeyCode.WIN_IME:
      case KeyCode.WIN_KEY:
      case KeyCode.WIN_KEY_LEFT:
      case KeyCode.WIN_KEY_RIGHT:
        return keyCode.WIN;
      default:
        return keyCode.UNIDENTIFIED;
    }
  }
}
