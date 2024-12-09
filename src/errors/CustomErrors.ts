export class MissingFieldsError extends Error {
    constructor() {
        super("Campos faltando");
        this.name = "MissingFieldsError";
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class InvalidFormatError extends Error {
    constructor() {
        super("Campos com formato inválido");
        this.name = "InvalidFormatError";
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class ProductNotFoundError extends Error {
    constructor() {
        super("Produto inexistente");
        this.name = "ProductNotFoundError";
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class CategoryNotFoundError extends Error {
    constructor() {
        super("Categoria inexistente");
        this.name = "CategoryNotFoundError";
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
export class SupplierNotFoundError extends Error {
    constructor() {
        super("Fornecedor inexistente");
        this.name = "SupplierNotFoundError";
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
export class AssociationNotFoundError extends Error {
    constructor() {
        super("Associação inexistente");
        this.name = "AssociationNotFoundError";
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class InvalidPriceRangeError extends Error {
    constructor() {
        super("Preço mínimo maior que preço máximo");
        this.name = "InvalidPriceRangeError";
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

