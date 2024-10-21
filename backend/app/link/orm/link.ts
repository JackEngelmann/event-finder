import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Repository,
    EntityRepository,
} from 'typeorm'
import { EventLinkDataModel } from './eventLink'
import { ClubLinkDataModel } from './clubLink'

export type LinkType = {
    id?: number
    href: string
    type: 'HOMEPAGE' | 'FACEBOOK'
}

@Entity('link')
export class LinkDataModel {
    @PrimaryGeneratedColumn()
    id!: string

    @Column()
    href!: string

    @Column()
    type!: string
}

@EntityRepository(LinkDataModel)
export class LinkRepository extends Repository<LinkDataModel> {
    async getLinksForEvent(eventId: number) {
        return this.createQueryBuilder('link')
            .innerJoin(
                EventLinkDataModel,
                'eventLink',
                'eventLink.linkId = link.id'
            )
            .where('eventLink.eventId = :eventId', { eventId })
            .getMany()
    }

    async getLinksForClub(clubId: number) {
        return this.createQueryBuilder('link')
            .innerJoin(
                ClubLinkDataModel,
                'clubLink',
                'clubLink.linkId = link.id'
            )
            .where('clubLink.clubId = :clubId', { clubId })
            .getMany()
    }
}
