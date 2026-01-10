export class EventCreatedEvent {
    constructor(
        public readonly eventId: number,
        public readonly userId: number,
        public readonly title: string
    ) { }
}