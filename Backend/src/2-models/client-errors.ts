abstract class ClientError {
    public constructor(public status: number, public message: string) {}
}

export class RouteNotFoundError extends ClientError {
    public constructor(route: string) {
        super(404, `Route: ${route} not found`);
    }
}

export class ResourceNotFoundError extends ClientError {
    public constructor(id: number) {
        super(404, `ID: ${id} not found`);
    }
}

export class ValidationError extends ClientError {
    public constructor(message: string) {
        super(400, message);
    }
}

export class UnauthorizedError extends ClientError {
    public constructor(message: string) {
        super(401, message);
    }
}
