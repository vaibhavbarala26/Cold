
  interface props {
    onclose:()=>void,
    operation:boolean
  }
const Operation = ({operation , onclose}:props) => {
  return (
    <div>
      <Dialog open={operation} onOpenChange={onclose}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Operation status</DialogTitle>
                <DialogDescription>
            This is a message describing the status of the operation.
          </DialogDescription>
            </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Operation
