export abstract class DataTableUtils {

  public static truncate(value: string, truncateAt: number): string {
    const elipsis = '...';
    let truncated = '';
    if (value === null && truncateAt === null) {
      return value;
    }
    if (value.length > truncateAt) {
      truncated = value.substring(0, truncateAt - elipsis.length) + elipsis;
    } else {
      truncated = value;
    }
    return truncated;
  }

  public static addEventForChild(parent, eventName, childSelector, cb): void {
    parent.addEventListener(eventName, (event) => {
      const clickedElement = event.target;
      const matchingChild = clickedElement.closest(childSelector);
      if (matchingChild) {
        cb(matchingChild);
      }
    });
  }

}
