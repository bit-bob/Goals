//
//  AppIntent.swift
//  MacWidget
//
//  Created by Luke Harris on 17/11/2023.
//

import WidgetKit
import AppIntents

@available(macCatalystApplicationExtension 17.0, *)
struct ConfigurationAppIntent: WidgetConfigurationIntent {
    static var title: LocalizedStringResource = "Configuration"
    static var description = IntentDescription("This is an example widget.")

    // An example configurable parameter.
    @Parameter(title: "Favorite Emoji", default: "😃")
    var favoriteEmoji: String
}
