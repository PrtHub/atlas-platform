const AuthLayout = ({
    children
  }: {
    children: React.ReactNode
  }) => {
    return ( 
      <div className="h-svh w-full flex items-center justify-center">
        {children}
      </div>
     );
  }
  
  export default AuthLayout;