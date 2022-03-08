import { FindAllAvailableUseCase } from "./FindAllAvailableUseCase";

let findAllAvailableUseCase: FindAllAvailableUseCase;

describe("Find All Available Deliveries", () => {

    beforeEach(() => {
        findAllAvailableUseCase = new FindAllAvailableUseCase();
    });

    it("should be able to show all available deliveries", async () => {
        const findAllAvailable = findAllAvailableUseCase.execute();

        //console.log("find All available", typeof(findAllAvailable), findAllAvailable);

        //expect(findAllAvailable)
    });
});