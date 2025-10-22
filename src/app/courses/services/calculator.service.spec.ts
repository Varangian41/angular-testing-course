import { CalculatorService } from "./calculator.service";
import { TestBed } from "@angular/core/testing";
import { LoggerService } from "./logger.service";

describe('CalculatorService', () => {

  let calculator: CalculatorService;
  let loggerSpy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        {
          provide: LoggerService,
          useValue: jasmine.createSpyObj('LoggerService', ['log'])
        }
      ]
    })
    calculator = TestBed.inject(CalculatorService);
    loggerSpy = TestBed.inject(LoggerService);
  });

  it('should add two numbers', () => {
    const result  = calculator.add(2,2);

    expect(result).toBe(4, 'Unexpected addition result');

    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

  it('should subtract two numbers', () => {
    const result  = calculator.subtract(2,2);

    expect(result).toBe(0, 'Unexpected subtraction result');

    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });
});
