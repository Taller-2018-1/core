export class ExternalIndicator {
    Resultado: TotalResult;

    constructor() { }
}

class TotalResult{
    Resultados: Result[];
    CantidadResultados: number;
    TotalResultados: number;

    constructor() {}
}

class Result{
    ReferenciaEmpresa: PymeReference;
    Estado: number;

    constructor() {}
}

class PymeReference{
    NombreFantasia: string;

    constructor() { }
}
