//
//  Widget.swift
//  Widget
//
//  Created by Luke Harris on 16/11/2023.
//

import WidgetKit
import SwiftUI
import Charts

@available(macCatalystApplicationExtension 17.0, *)
struct Provider: AppIntentTimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(date: Date(), configuration: ConfigurationAppIntent())
    }

    func snapshot(for configuration: ConfigurationAppIntent, in context: Context) async -> SimpleEntry {
        SimpleEntry(date: Date(), configuration: configuration)
    }
    
    func timeline(for configuration: ConfigurationAppIntent, in context: Context) async -> Timeline<SimpleEntry> {
        var entries: [SimpleEntry] = []

        // Generate a timeline consisting of five entries an hour apart, starting from the current date.
        let currentDate = Date()
        for hourOffset in 0 ..< 5 {
            let entryDate = Calendar.current.date(byAdding: .hour, value: hourOffset, to: currentDate)!
            let entry = SimpleEntry(date: entryDate, configuration: configuration)
            entries.append(entry)
        }

        return Timeline(entries: entries, policy: .atEnd)
    }
}

@available(macCatalystApplicationExtension 17.0, *)
struct SimpleEntry: TimelineEntry {
    let date: Date
    let configuration: ConfigurationAppIntent
}

struct Record: Identifiable {
    var id: UUID
    var date: Date
    var value: Double


    init(dateString: String, value: Double) {
        let deFormatter = DateFormatter()
        deFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSZ"
        self.date = deFormatter.date(from: dateString)!
        self.value = value
        self.id = UUID()
    }
}

var data: [Record] = [
    Record(dateString: "2023-10-30T23:06:23.000Z", value: 1),
    Record(dateString: "2023-10-31T23:06:23.000Z", value: 9),
    Record(dateString: "2023-11-01T23:06:23.000Z", value: 24.6),
    Record(dateString: "2023-11-02T23:06:23.000Z", value: 36.510000000000005),
    Record(dateString: "2023-11-03T23:06:23.000Z", value: 46.28),
    Record(dateString: "2023-11-04T23:06:23.000Z", value: 111.28),
    Record(dateString: "2023-11-05T23:06:23.000Z", value: 119.28),
    Record(dateString: "2023-11-06T23:06:23.000Z", value: 137.29),
    Record(dateString: "2023-11-07T23:06:23.000Z", value: 838.29),
    Record(dateString: "2023-11-08T23:06:23.000Z", value: 850.29),
    Record(dateString: "2023-11-09T23:06:23.000Z", value: 850.29),
    Record(dateString: "2023-11-10T22:47:21.000Z", value: 863.68),
    Record(dateString: "2023-11-11T22:47:21.000Z", value: 872.1099999999999),
    Record(dateString: "2023-11-12T22:47:21.000Z", value: 889.31),
    Record(dateString: "2023-11-13T22:47:21.000Z", value: 890.5999999999999),
    Record(dateString: "2023-11-14T22:47:21.000Z", value: 895.18),
    Record(dateString: "2023-11-15T22:48:28.000Z", value: 907.18),
    Record(dateString: "2023-11-16T23:01:30.000Z", value: 920.16),
    Record(dateString: "2023-11-17T23:01:30.000Z", value: 924.36),
    Record(dateString: "2023-11-18T23:01:30.000Z", value: 925.36)
]

@available(macCatalystApplicationExtension 16.0, *)
struct GoalChart : View {
    var data: [Record]
    
    var body: some View {
        Chart(data) {
            LineMark(
                x: .value("Date", $0.date),
                y: .value("Value", $0.value)
            )
        }
        .chartXAxis(.hidden)
    }
}

@available(macCatalystApplicationExtension 17.0, *)
struct WidgetEntryView : View {
    @Environment(\.widgetContentMargins) var margins
    @Environment(\.widgetFamily) var widgetFamily
    
    var entry: Provider.Entry

    var body: some View {
        switch widgetFamily {
        case .systemSmall:
            GoalChart(data: data)
                .padding(margins)
        case .systemMedium:
            HStack {
                Text("Spending").font(.system(.title, design: .rounded))
                GoalChart(data: data)
            }
            .padding(margins)
        default:
            VStack {
                Text("Spending").font(.system(.title, design: .rounded))
                GoalChart(data: data)
            }
            .padding(margins)
        }
    }
}

@available(macCatalystApplicationExtension 17.0, *)
struct GoalsWidget: Widget {
    let kind: String = "Widget"

    var body: some WidgetConfiguration {
        AppIntentConfiguration(kind: kind, intent: ConfigurationAppIntent.self, provider: Provider()) { entry in
            WidgetEntryView(entry: entry)
                .containerBackground(.fill.tertiary, for: .widget)
        }
    }
}

@available(macCatalystApplicationExtension 17.0, *)
extension ConfigurationAppIntent {
    fileprivate static var smiley: ConfigurationAppIntent {
        let intent = ConfigurationAppIntent()
        intent.favoriteEmoji = "😀"
        return intent
    }
    
    fileprivate static var starEyes: ConfigurationAppIntent {
        let intent = ConfigurationAppIntent()
        intent.favoriteEmoji = "🤩"
        return intent
    }
}

@available(macCatalystApplicationExtension 17.0, *)
#Preview(as: .systemExtraLarge) {
    GoalsWidget()
} timeline: {
    SimpleEntry(date: .now, configuration: .smiley)
    SimpleEntry(date: .now, configuration: .starEyes)
}
