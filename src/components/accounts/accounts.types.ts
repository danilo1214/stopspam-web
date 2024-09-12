export enum ADD_ACCOUNTS_STEPS {
  /** Select from already linked pages */
  SELECT_PAGES = 0,
  /** Search for the ig page */
  IG_PAGE_NAME_INPUT = 1,
  /** Connect specific ig page, by selecting either a fb page to use, or creating a new fb page  */
  CONNECT_PAGE_SELECTION_NEW_PAGE = 2,
  /** Info on helping users create a new page */
  CONNECT_PAGE_CREATE_PAGE = 3,
}
