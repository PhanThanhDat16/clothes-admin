const Header = () => {
  return (
    <div className=" fixed flex items-center justify-end w-full h-16 gap-6 px-6 bg-white shadow-md ">
      <div>
        <i className="text-xl text-[var(--Puerto-Rico)] bx bx-menu"></i>
      </div>
      <div>
        <i className="text-xl text-[var(--Puerto-Rico)] bx bxs-bell"></i>
      </div>
      <div className="flex items-center gap-2 ">
        <div className="w-8 h-8 overflow-hidden rounded-full">
          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
        <span className="text-sm font-medium ">Phan Dat</span>
      </div>
    </div>
  )
}

export default Header
