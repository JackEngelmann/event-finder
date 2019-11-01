import { AppContext } from '../appContext'

export function deleteEvent(appContext: AppContext, id: number) {
    const { db } = appContext
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM event WHERE id = $id', { $id: id })
        db.run(
            'DELETE FROM eventGenre WHERE eventId = $eventId',
            {
                $eventId: id,
            },
            err => (err ? reject(err) : resolve(err))
        )
    })
}
