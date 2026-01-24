import Header from "@/components/layout/Header";
import NavigationBar, { DiamondIcon } from "@/components/layout/NavigationBar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const ProjectsPage = () => {
  const navItems = [
    {
      icon: <DiamondIcon isActive={true} />,
      label: "컬렉션",
      path: "/home",
    },
    {
      icon: <DiamondIcon isActive={false} />,
      label: "프로젝트",
      path: "/projects",
    },
    {
      icon: <DiamondIcon isActive={false} />,
      label: "마이",
      path: "/my",
    },
  ];

  return (
    <div className="w-full min-h-screen">
      <Header
        showNotificationButton
        variant="logo"
        className="fixed top-0 z-10 inset-x-0"
      />
      <Label className="text-lg font-bold fixed top-17 z-10 left-5">
        내 여행 계획
      </Label>
      <main className="flex flex-col mt-17 mx-5 justify-center items-center h-[calc(100vh-160px)]">
        <p className="text-center mb-6">
          여행 계획이 아직 없습니다.
          <br />
          새로운 여행을 시작해보세요.
        </p>
        <Button className="w-38.5 h-10">여행 계획하기</Button>
      </main>
      <NavigationBar
        items={navItems}
        className="fixed bottom-0 z-10 inset-x-0"
      />
    </div>
  );
};

export default ProjectsPage;
