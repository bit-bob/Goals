//
//  MacWidgetBundle.swift
//  MacWidget
//
//  Created by Luke Harris on 17/11/2023.
//

import WidgetKit
import SwiftUI

@available(macCatalystApplicationExtension 17.0, *)
@main
struct MacWidgetBundle: WidgetBundle {
    var body: some Widget {
        GoalsWidget()
    }
}
