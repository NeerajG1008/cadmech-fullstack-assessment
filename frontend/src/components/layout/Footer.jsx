function Footer() {
    return (
      <footer className="border-t bg-white mt-10">
        <div className="max-w-7xl mx-auto px-6 py-5 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} SmartLab Equipment Manager •
          CADMech Engineering Pvt. Ltd.
        </div>
      </footer>
    );
  }
  
  export default Footer;