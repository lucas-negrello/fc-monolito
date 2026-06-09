import BaseEntity from "../../@shared/domain/entity/base.entity";
import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItem from "./invoice-item";
import Address from "../../@shared/domain/value-object/address";

type InvoiceProps = {
    id?: Id;
    name: string;
    document: string;
    address: Address;
    items: InvoiceItem[];
    createdAt?: Date;
    updatedAt?: Date;
}

export default class Invoice extends BaseEntity implements AggregateRoot {
    private readonly _name: string;
    private readonly _document: string;
    private _address: Address;
    private _items: InvoiceItem[];

    constructor(props: InvoiceProps) {
        super(props.id);
        this._name = props.name;
        this._document = props.document;
        this._address = props.address;
        this._items = props.items;
    }

    get total(): number {
        if (this._items.length === 0) return 0;
        return this._items.reduce((total, item) => total + item.price, 0);
    }

    get name() {
        return this._name;
    }

    get document() {
        return this._document;
    }

    get address() {
        return this._address;
    }

    get items() {
        return this._items;
    }
}