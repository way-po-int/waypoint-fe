"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPinIcon } from "lucide-react";

const ManualPlaceForm = () => {
  const [formData, setFormData] = useState({
    placeName: "",
    placeTag: "",
    placeLocation: "",
    businessStartTime: "",
    businessEndTime: "",
    description: "",
    source: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLocationButtonClick = () => {
    // TODO: 위치 선택 로직 구현
    console.log("위치 선택");
  };
  return (
    <div className="flex-1 overflow-y-auto px-5 pb-5">
      <h2 className="text-lg font-bold mt-6 mb-6">장소 추가</h2>
      <div className="space-y-6">
        {/* 장소 이름 */}
        <div className="space-y-2">
          <Label htmlFor="placeName">장소 이름</Label>
          <Input
            id="placeName"
            placeholder="Input Value"
            value={formData.placeName}
            onChange={(e) => handleInputChange("placeName", e.target.value)}
          />
        </div>

        {/* 장소 태그 */}
        <div className="space-y-2">
          <Label htmlFor="placeTag">장소 태그</Label>
          <Input
            id="placeTag"
            placeholder="Input Value"
            value={formData.placeTag}
            onChange={(e) => handleInputChange("placeTag", e.target.value)}
          />
        </div>

        {/* 장소 위치 */}
        <div className="space-y-2">
          <Label htmlFor="placeLocation">장소 위치</Label>
          <div className="flex gap-2">
            <Input
              id="placeLocation"
              placeholder="Input Value"
              value={formData.placeLocation}
              onChange={(e) =>
                handleInputChange("placeLocation", e.target.value)
              }
              className="flex-1"
            />
            <Button
              variant="default"
              size="icon"
              className="bg-black hover:bg-black/90"
              onClick={handleLocationButtonClick}
            >
              <MapPinIcon className="size-4 text-white" />
            </Button>
          </div>
        </div>

        {/* 영업 시간 */}
        <div className="space-y-2">
          <Label>영업 시간</Label>
          <div className="flex gap-2">
            <Input
              placeholder="영업 시작"
              value={formData.businessStartTime}
              onChange={(e) =>
                handleInputChange("businessStartTime", e.target.value)
              }
              className="flex-1"
            />
            <Input
              placeholder="영업 종료"
              value={formData.businessEndTime}
              onChange={(e) =>
                handleInputChange("businessEndTime", e.target.value)
              }
              className="flex-1"
            />
          </div>
        </div>

        {/* 설명 */}
        <div className="space-y-2">
          <Label htmlFor="description">설명</Label>
          <Textarea
            id="description"
            placeholder="Input Value"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            rows={4}
          />
        </div>

        {/* 출처 */}
        <div className="space-y-2">
          <Label htmlFor="source">출처</Label>
          <Input
            id="source"
            placeholder="Input Value"
            value={formData.source}
            onChange={(e) => handleInputChange("source", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ManualPlaceForm;
