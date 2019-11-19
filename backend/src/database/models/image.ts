import { Database } from '../database'

export class ImageDataModel {
    dataUrl: string
    fileName: string
    constructor(row: any) {
        this.dataUrl = row.dataurl
        this.fileName = row.filename
    }
}

export class ImageModel {
    private db: Database

    constructor(db: Database) {
        this.db = db
    }

    async createImage(input: { dataUrl: string }) {
        return this.db
            .get(
                `
            INSERT INTO image (
                dataurl
            ) VALUES (
                $1
            ) RETURNING Id
        `,
                [input.dataUrl]
            )
            .then(res => res.id)
            .catch(err => console.error(err))
    }

    async deleteImage(id: number) {
        return this.db.run(`DELETE FROM image WHERE id = $1`, [id])
    }

    async getImage(id: number) {
        const sql = 'SELECT * FROM image WHERE id = $1'
        const params = [id]
        const row = await this.db.get(sql, params)
        if (!row) return undefined
        const image = new ImageDataModel(row)
        return image
    }
}
