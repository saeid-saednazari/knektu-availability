import { DiaryGeneration } from './operation/diary-generation';
import { DiaryValidation } from './operation/diary-validation';
import { IDiaryInitialization, IDiary } from './interface/diary.interface';
import { DiaryExtraction } from './operation/diary-extract';
import { ISingleDay } from './interface/datetime.interface';
import { DiaryStatus, DiaryType } from './enum/diary.enum';

export abstract class Availability {
  #diary_: IDiary;
  protected abstract createInstance(data: IDiaryInitialization): IDiary;

  constructor(data: IDiaryInitialization) {
    this.#diary_ = this.createInstance(data);
    this.preprocessing();
  }

  private preprocessing(): void {
    this.#diary_.execute(new DiaryValidation());
    this.#diary_.execute(new DiaryExtraction());
    this.#diary_.execute(new DiaryGeneration());
  }

  public get diaries(): ISingleDay[] {
    return this.#diary_.diaries;
  }

  public get status(): DiaryStatus {
    return this.#diary_.status;
  }

  public set status(status: DiaryStatus) {
    this.#diary_.status = status;
  }

  public get type(): DiaryType {
    return this.#diary_.type;
  }
}
