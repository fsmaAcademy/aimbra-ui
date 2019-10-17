export abstract class Element extends Node {
  public static tag(tag: string): HTMLElement {
    return document.createElement(tag);
  }
}