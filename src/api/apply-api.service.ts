import { APIServiceBase } from "./api-service-base";
import { ApplyDto } from "@/interfaces/api-models/apply.type";

export class ApplyApiService extends APIServiceBase {
  private readonly root = `${this.API_BASE_URL}/application`;

  applyForJob = async (
    candidate_id: any,
    data: ApplyDto,
    file: File
  ): Promise<any> => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key as keyof ApplyDto]);
    });

    formData.append("file", file);
    formData.append("candidate_id", candidate_id);

    return this._post(this.root, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
  noCandidateApplyForJob = async (data: ApplyDto, file: File): Promise<any> => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key as keyof ApplyDto]);
    });

    formData.append("file", file);

    return this._post(this.root, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  // Có thể thêm các hàm khác nếu cần
  // getApplications = async (): Promise<any> => {...}
  // updateApplication = async (id: string, data: UpdateAppliedDto): Promise<any> => {...}
}

export const applyApiService = new ApplyApiService();
