import Foundation
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(GoalsWidgetBridgePlugin)
public class GoalsWidgetBridgePlugin: CAPPlugin {
    private let implementation = GoalsWidgetBridge()

    @objc func updateWidgetData(_ call: CAPPluginCall) {
        let goal = call.getObject("goal") ?? [:]
        let records = call.getArray("records") ?? []
        print("\(goal)")
        print("\(records)")
        call.resolve()
    }
}
