import { google, homegraph_v1 } from 'googleapis'
import { GaxiosPromise, MethodOptions } from 'googleapis-common'
const homegraph = google.homegraph('v1')
export const reportStateAndNotification:
    (params: homegraph_v1.Params$Resource$Devices$Reportstateandnotification, options?: MethodOptions) => GaxiosPromise<homegraph_v1.Schema$ReportStateAndNotificationResponse> =
    homegraph['devices']['reportStateAndNotification']
