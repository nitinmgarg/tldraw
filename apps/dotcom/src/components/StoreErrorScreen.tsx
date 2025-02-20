import { TLIncompatibilityReason } from '@tldraw/tlsync'
import { exhaustiveSwitchError } from 'tldraw'
import { RemoteSyncError } from '../utils/remote-sync/remote-sync'
import { ErrorPage } from './ErrorPage/ErrorPage'

export function StoreErrorScreen({ error }: { error: Error }) {
	let header = 'Could not connect to server.'
	let message = ''

	if (error instanceof RemoteSyncError) {
		switch (error.reason) {
			case TLIncompatibilityReason.ClientTooOld: {
				message = 'This client is out of date. Please refresh the page.'
				break
			}
			case TLIncompatibilityReason.ServerTooOld: {
				message =
					'The multiplayer server is out of date. Please reload the page. If the problem persists contact the system administrator.'
				break
			}
			case TLIncompatibilityReason.InvalidRecord: {
				message =
					'Your changes were rejected by the server. Please reload the page. If the problem persists contact the system administrator.'
				break
			}
			case TLIncompatibilityReason.InvalidOperation: {
				message =
					'Your changes were rejected by the server. Please reload the page. If the problem persists contact the system administrator.'
				break
			}
			case TLIncompatibilityReason.RoomNotFound: {
				header = 'Room not found'
				message = 'The room you are trying to connect to does not exist.'
				break
			}
			default:
				exhaustiveSwitchError(error.reason)
		}
	}

	return <ErrorPage icon messages={{ header, para1: message }} />
}
