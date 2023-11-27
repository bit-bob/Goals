import UIKit
import Dynamic
import Capacitor

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
        #if targetEnvironment(macCatalyst)
        window?.backgroundColor = .red
        if let titlebar = window?.windowScene?.titlebar {
            let toolbar = NSToolbar(identifier: "YourAppToolbar")
            toolbar.delegate = self
            titlebar.toolbar = toolbar
            titlebar.separatorStyle = .none
            titlebar.titleVisibility = .hidden
//            titlebar.toolbar = nil
        }
        #endif
        
        (window?.rootViewController as? CAPBridgeViewController)?.webView?.backgroundColor = .clear;
        (window?.rootViewController as? CAPBridgeViewController)?.webView?.underPageBackgroundColor = .clear;
        (window?.rootViewController as? CAPBridgeViewController)?.webView?.isOpaque = false;
        (window?.rootViewController as? CAPBridgeViewController)?.webView?.layer.backgroundColor = UIColor.clear.cgColor;
        
        
        return true
    }

    func applicationWillResignActive(_ application: UIApplication) {
        // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
        // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
    }

    func applicationDidEnterBackground(_ application: UIApplication) {
        // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
        // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
    }

    func applicationWillEnterForeground(_ application: UIApplication) {
        // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
    }

    func applicationDidBecomeActive(_ application: UIApplication) {
        // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
    }

    func applicationWillTerminate(_ application: UIApplication) {
        // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
    }

    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
        // Called when the app was launched with a url. Feel free to add additional processing here,
        // but if you want the App API to support tracking app url opens, make sure to keep this call
        return ApplicationDelegateProxy.shared.application(app, open: url, options: options)
    }

    func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
        // Called when the app was launched with an activity, including Universal Links.
        // Feel free to add additional processing here, but if you want the App API to support
        // tracking app url opens, make sure to keep this call
        return ApplicationDelegateProxy.shared.application(application, continue: userActivity, restorationHandler: restorationHandler)
    }

}

#if targetEnvironment(macCatalyst)
extension AppDelegate: NSToolbarDelegate {
    func toolbarAllowedItemIdentifiers(_ toolbar: NSToolbar) -> [NSToolbarItem.Identifier] {
        return [NSToolbarItem.Identifier.flexibleSpace, .listView, .galleryView, .addNewItem]
    }

    func toolbarDefaultItemIdentifiers(_ toolbar: NSToolbar) -> [NSToolbarItem.Identifier] {
        return [.listView, .galleryView, .flexibleSpace, .addNewItem]
    }

    func toolbar(_ toolbar: NSToolbar, itemForItemIdentifier itemIdentifier: NSToolbarItem.Identifier, willBeInsertedIntoToolbar flag: Bool) -> NSToolbarItem? {
        let toolbarItem = NSToolbarItem(itemIdentifier: itemIdentifier)
        
        switch itemIdentifier {
        case .listView:
            toolbarItem.label = "List View"
            toolbarItem.image = UIImage(systemName: "list.bullet")
            toolbarItem.target = self
            toolbarItem.action = #selector(switchToListView)
        case .galleryView:
            toolbarItem.label = "Gallery View"
            toolbarItem.image = UIImage(systemName: "square.grid.2x2")
            toolbarItem.target = self
            toolbarItem.action = #selector(switchToGalleryView)
        case .addNewItem:
            toolbarItem.label = "Add New Item"
            toolbarItem.image = UIImage(systemName: "plus")
            toolbarItem.target = self
            toolbarItem.action = #selector(addNewItem)
        default:
            return nil
        }
        
        return toolbarItem
    }

    @objc func switchToListView() {
        // Implement switching to list view
    }

    @objc func switchToGalleryView() {
        // Implement switching to gallery view
    }

    @objc func addNewItem() {
        // Implement adding a new item
    }
}


extension NSToolbarItem.Identifier {
    static let listView = NSToolbarItem.Identifier("listView")
    static let galleryView = NSToolbarItem.Identifier("galleryView")
    static let addNewItem = NSToolbarItem.Identifier("addNewItem")
}
#endif
