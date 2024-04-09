import Layout from "@/components/layouts/layout-screen";

const UnauthorizedPage = () => {
  return (
    <Layout>
      <div className="unauthorized-page-container">
        <h1 className="unauthorized-page-heading">
          This board doesn't exists!
        </h1>
        <h3 className="unauthorized-page-sub-heading">
          Make sure you typed the URL correctly.
        </h3>
      </div>
    </Layout>
  );
};

export default UnauthorizedPage;
