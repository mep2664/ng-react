declare module 'react-sortablejs' {
    import Sortable from 'sortablejs';

    export interface SortableProps<ItemData, ListProps> {
        options?: Sortable.Options;
        onChange?: (list: ItemData[], sortable: Sortable, event: Sortable.SortableEvent) => void;
        tag?: string | React.ComponentType<ListProps>;
        style?: React.CSSProperties;
    }

    export default class SortableComponent<ItemData, ListProps> extends React.Component<
        SortableProps<ItemData, ListProps>
        > { }
}