import { NotifyManager, ResizeManager, StorageManager } from "@/core/Managers";
// import { ApiClient } from "@api";

/**
 * Centralized manager for core game systems such as audio, HUD, and scenes.
 *
 * This class acts as a container for other managers and provides an entry point
 * for accessing and controlling various game systems in a cohesive manner.
 *
 * While `GameManager` centralizes the management of core game systems, each of the
 * individual managers (e.g., `AudioManager`, `HUDManager`, etc.) can
 * also be used independently without the need to reference `GameManager`. This allows
 * for greater modularity and flexibility in how game systems are accessed and used.
 *
 * For example, you can access `AudioManager` directly as:
 *   const audio = new AudioManager();
 *
 * This approach allows you to keep game systems loosely coupled and facilitates their
 * usage in different contexts (such as API clients, external modules, etc.) without
 * the overhead of always instantiating `GameManager`.
 */
export class GameManager {
  /**
   * Instance responsible for handling HTTP requests to the server.
   * Provides methods for GET, POST, PUT, DELETE, and other HTTP operations.
   * This is configured using Axios and includes the custom settings, such as
   * base URL, headers, interceptors, and timeout settings.
   * @type {AxiosInstance}
   */
  //   public api: AxiosInstance;

  /**
   * Instance responsible for managing notification in the game.
   * Handles game notifications
   * @type {NotifyManager}
   */
  public notify: NotifyManager;

  //   /**
  //    * Instance responsible for managing storage operations.
  //    * Provides methods to interact with localStorage or other storage mechanisms
  //    * in a unified way. This can be used for saving and retrieving game-related data,
  //    * such as player preferences, authentication tokens, or progress.
  //    *
  //    * While accessible through the `GameManager`, `StorageManager` can also be
  //    * used independently in other parts of the application where direct access
  //    * to storage is needed, ensuring modularity and flexibility.
  //    *
  //    * @type {StorageManager}
  //    */
  public storage: StorageManager;

  /**
   * Instance responsible for managing size of the device screen.
   * Provides functionality to listen for device resizing
   * and counting the width & the height.
   */
  public size: ResizeManager;

  /**
   * Creates an instance of `GameManager` and initializes core managers.
   *
   * Each manager is created independently and is ready to use after the `GameManager`
   * instance is constructed. This class does not enforce a singleton pattern by default.
   */
  constructor() {
    // this.api = ApiClient;
    this.size = new ResizeManager();
    this.notify = new NotifyManager();
    this.storage = new StorageManager();
  }
}
