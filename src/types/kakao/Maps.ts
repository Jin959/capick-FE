import Services from "@/types/kakao/Services";

interface Maps {
  services: Services;
  load: (callback: () => void) => void;
  Map: KakaoMap;
  LatLng: LatLng;
  LatLngBounds: LatLngBounds;
  ZoomControl: ZoomControl;
  ControlPosition: ControlPosition;
  Point: Point;
  event: Event;
  Marker: Marker;
  InfoWindow: InfoWindow;
}

export default Maps;

export interface KakaoMap {
  new(container: HTMLDivElement, option: MapOption): KakaoMap;

  setCenter: (latlng: LatLng) => void;
  getCenter: () => LatLng;
  setLevel: (level: MapLevel, options?: setLevelOption) => void;
  getLevel: () => MapLevel;
  setBounds: (bounds: LatLngBounds,
              paddingTop?: number, paddingRight?: number,
              paddingBottom?: number, paddingLeft?: number) => void;
  getBounds: () => LatLngBounds;
  setMinLevel: (minLevel: MapLevel) => void;
  setMaxLevel: (maxLevel: MapLevel) => void;
  panBy: (dx: number, dy: number) => void;
  panTo: (latlng_or_bounds: LatLng | LatLngBounds, padding?: number) => void;
  addControl: (control: ZoomControl, position: ControlPosition) => void;
  removeControl: (control: ZoomControl, position?: ControlPosition) => void;
  setDraggable: (draggable: boolean) => void;
  getDraggable: () => boolean;
  setZoomable: (zoomable: boolean) => void;
  getZoomable: () => boolean;
  relayout: () => void;
  setKeyboardShortcuts: (active: boolean) => void;
  getKeyboardShortcuts: () => boolean;
  setCursor: (style: string) => void;
}

export type MapLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

export interface MapOption {
  center?: LatLng;
  level?: number;
  draggable?: boolean;
  scrollwheel?: boolean;
  disableDoubleClick?: boolean;
  disableDoubleClickZoom?: boolean;
  projectionId?: string;
  tileAnimation?: boolean;
  keyboardShortcuts?: boolean | {
    speed: number;
  };
}

interface setLevelOption {
  animate?: boolean | {
    duration: number;
  }
  anchor?: LatLng;
}

export interface ZoomControl {
  new(): ZoomControl;
}

export interface ControlPosition {
  TOP: ControlPosition;
  TOPLEFT: ControlPosition;
  TOPRIGHT: ControlPosition;
  LEFT: ControlPosition;
  RIGHT: ControlPosition;
  BOTTOMLEFT: ControlPosition;
  BOTTOM: ControlPosition;
  BOTTOMRIGHT: ControlPosition;
}

export interface LatLng {
  new(latitude: number, longitude: number): LatLng;

  lat: number;
  lon: number;
}

export interface LatLngBounds {
  new(sw: LatLng, ne: LatLng): LatLngBounds;

  equals: (latlngBounds: LatLngBounds) => boolean;
  toString: () => string;
  getSouthWest: LatLng;
  getNorthEast: LatLng;
  extend: (latLng: LatLng) => void;
}

export interface Point {
  new(x: number, y: number): Point;
}

export interface Event {
  addListener: (target: EventTarget, type: MapEvent | MarkerEvent, handler: EventHandler) => void;
  removeListener: (target: EventTarget, type: MapEvent | MarkerEvent, handler: EventHandler) => void;
}

export type MapEvent = "center_changed" | "zoom_start" | "zoom_changed"
  | "bounds_changed" | "click" | "dblclick"
  | "rightclick" | "mousemove" | "dragstart"
  | "drag" | "dragend" | "idle"
  | "tilesloaded" | "maptypeid_changed";

export type MarkerEvent = "click" | "mouseover" | "mouseout" | "rightclick" | "dragstart" | "dragend";

type EventTarget = KakaoMap | Marker;

type EventHandler = (mouseEvent?: MouseEvent) => void;

interface MouseEvent {
  latLng: LatLng;
  point: Point;
}

export interface Marker {
  new(option: MarkerOption): Marker;

  setMap: (map_or_roadview: KakaoMap | null) => void;
  getMap: () => KakaoMap;
  setImage: (image: MarkerImage) => void;
  getImage: () => MarkerImage;
  setPosition: (position: LatLng) => void;
  getPosition: () => LatLng;
  setZIndex: (zIndex: number) => void;
  getZIndex: () => number;
  setVisible: (visible: boolean) => void;
  getVisible: () => boolean;
  setTitle: (title: string) => void;
  getTitle: () => string;
  setDraggable: (draggable: boolean) => void;
  getDraggable: () => boolean;
  setClickable: (clickable: boolean) => void;
  getClickable: () => boolean;
  setOpacity: (opacity: number) => void;
  getOpacity: () => number;
}

export interface MarkerOption {
  map?: KakaoMap;
  position?: LatLng;
  image?: MarkerImage;
  title?: string;
  draggable?: boolean;
  clickable?: boolean;
  zIndex?: number;
  opacity?: number;
  altitude?: number;
  range?: number;
}

export interface MarkerImage {
  src?: string;
}

export interface InfoWindow {
  new(option: InfoWindowOption): InfoWindow;

  open: (map_or_roadview: KakaoMap, marker?: Marker) => void;
  close: () => void;
  getMap: () => KakaoMap;
  setPosition: (position: LatLng) => void;
  getPosition: () => LatLng;
  setContent: (content: string) => void;
  getContent: () => string;
  setZIndex: (zIndex: number) => void;
  getZIndex: () => number;

}

export interface InfoWindowOption {
  content?: string;
  disableAutoPan?: boolean;
  map?: KakaoMap;
  position?: LatLng;
  removable?: boolean;
  zIndex?: number;
  altitude?: number;
  range?: number;
}