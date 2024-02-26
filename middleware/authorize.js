

 const authorize = (requiredRoles) => {
    return async (req, res, next) => {
      try {
        const role = req.body.role
        const hasRequiredRole = requiredRoles.includes(role)
        
        if (requiredRoles.includes(role)) {
          next();
        }else{
          res.status(200).send({ msg: 'you are not authorized' });
        }
      } catch (err) {
        res.status(401).send({ msg: "Something went wrong please try again" });
      }
    };
  };
  module.exports={authorize}