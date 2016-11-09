export interface MenuLink {
  icon?: string,
  text: string,
  link?: string,
  hide?: boolean,
  scroll?: string,
  active?: boolean
}

export interface ApidaysOrganizer {
  company: string,
  logo: string,
  url: string,
  event_organizer: {
    order: number
  }
}

export interface ApidaysPartner {
  name: string,
  logo: string,
  url: string
  event_partners?: any
}

export interface ApidaysPlace {
  name: string,
  city: string,
  country: string,
  address?: string,
  photo: string
}

export interface ApidaysTalk {
  id: number,
  title: string,
  start_at: string,
  length: number
}

export interface ApidaysSpeaker {
  id: number,
  name: string,
  company: string,
  title: string,
  linkedin: string,
  picture: string
  talks: Array<ApidaysTalk>
  event_speaker: {
    order: number
  }
}

export interface ApidaysSponsor {
  company: string,
  logo: string,
  url: string,
  event_sponsor: {
    category: string
  }
}

export interface ApidaysEvent {
  slug: string,
  title: string,
  baseline: string,
  date_start: string,
  date_end: string,
  id_place: number,
  place: ApidaysPlace,
  display_talk?: boolean,
  eventbrite?: string,
  call_to_speaker?: string,
  hackathon?: string,
  speakers?: Array<ApidaysSpeaker>
  sponsors?: Array<ApidaysSponsor>
  organizers?: Array<ApidaysOrganizer>
  partners?: Array<ApidaysPartner>
}