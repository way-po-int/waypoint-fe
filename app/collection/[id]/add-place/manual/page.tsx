import Header from "@/components/layout/Header";
import ManualPlaceForm from "@/components/collection/detailpage/ManualPlaceForm";

const ManualAddPlacePage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header variant="left" title="수동 입력" showCloseButton />
      <ManualPlaceForm />
    </div>
  );
};

export default ManualAddPlacePage;
