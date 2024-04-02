import { FindManyOptions } from "typeorm";
import { AppDataSource } from "../server/data-source";

interface PaginationResult<T> {
    totalObjects: number;
    currentPage: number;
    result: T[];
}

export async function paginate<T>(
    entity: any,
    page: number,
    limit: number,
    query: any
): Promise<PaginationResult<any>> {
    const repository = AppDataSource.manager.getRepository(entity);

    // Calculate skip
    const skip = (page - 1) * limit;

    // Construct options
    const options: FindManyOptions<any> = {
        where: query,
        order: { createdAt: "DESC" },
        take: limit,
        skip,
    };

    // Fetch data
    const result = await repository.find(options);

    // Count total objects
    const totalObjects = await repository.count({ where: query });

    // Calculate current page
    const currentPage = Math.ceil(skip / limit) + 1;

    return {
        totalObjects,
        currentPage,
        result,
    };
}
