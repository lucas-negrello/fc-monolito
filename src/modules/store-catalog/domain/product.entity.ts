import BaseEntity from "../../@shared/domain/entity/base.entity";
import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import Id from "../../@shared/domain/value-object/id.value-object";

type ProductProps = {
    id: Id;
    name: string;
    description: string;
    salePrice: number;
}

export default class Product extends BaseEntity implements AggregateRoot {
    private readonly _name: string;
    private readonly _description: string
    private readonly _salePrice: number

    constructor(props: ProductProps) {
        super(props.id);
        this._name = props.name;
        this._description = props.description;
        this._salePrice = props.salePrice;
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    get salePrice() {
        return this._salePrice;
    }
}