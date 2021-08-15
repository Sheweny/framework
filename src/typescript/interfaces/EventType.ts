import type { Event as Evt } from '../../Event'


export interface EventType extends Evt {
	before: Function,
	execute: Function,
}