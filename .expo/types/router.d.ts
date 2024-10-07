/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/StartPage` | `/_sitemap` | `/contexts/Auth` | `/tractive` | `/tractive/account` | `/tractive/geofence` | `/tractive/getOptionsAndAccountDetails`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
