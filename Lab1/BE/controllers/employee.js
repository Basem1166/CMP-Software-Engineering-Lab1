const employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
  const employeeID = req.params.id;
  const index = employee.findIndex(emp =>emp.id === employeeID);
  console.log(employeeID);
  if (index !== -1) {
    employee.splice(index, 1);
    res.status(200).json({ message: "Employee deleted successfully" });
  } else {
    res.status(404).json({ message: "Employee not found" });
  }
  
};

// TODO
exports.createEmployee = async (req, res, next) => {
  const {id, name} = req.body;
  if (employee.find(emp => emp.id === id)){
    return res.status(400).json({message: "An Employee with the same Id already exists"});
  }

  employee.push({id,name});
};
