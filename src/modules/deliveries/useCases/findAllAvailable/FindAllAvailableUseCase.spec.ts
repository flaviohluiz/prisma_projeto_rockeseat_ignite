import { FindAllAvailableUseCase } from "./FindAllAvailableUseCase";

let findAllAvailableUseCase: FindAllAvailableUseCase;

describe("Find All Available Deliveries", () => {

    beforeEach(() => {
        findAllAvailableUseCase = new FindAllAvailableUseCase();
    });

    it("should be able to show all available deliveries", async () => {
        const findAllAvailable = findAllAvailableUseCase.execute();

        //console.log("find all available:  ", "tipo:", typeof(findAllAvailable), findAllAvailable);

        //expect(findAllAvailable).toHaveProperty("Deliveries[]");
        //expect(findAllAvailable).toBe();
    });
});