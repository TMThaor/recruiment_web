import { useEffect, useState } from "react";
import Layout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IContact } from "@/interfaces/api-models/contact.type";
import { contactApiService } from "@/api/contact-api.service";
import { format } from "date-fns";
import { Send, Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const ContactManagement = () => {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<IContact | null>(null);
  const [deleteContact, setDeleteContact] = useState<IContact | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const getContacts = async () => {
    try {
      const res = await contactApiService.getAllContacts();
      if (res) setContacts(res);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch contacts");
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  const handleView = (contact: IContact) => {
    setSelectedContact(contact);
    setReplyMessage("");
    setIsOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteContact) return;
    try {
      await contactApiService.deleteContact(deleteContact.id);
      setContacts((prev) => prev.filter((c) => c.id !== deleteContact.id));
      toast.success("Contact deleted successfully");
    } catch (err) {
      toast.error("Failed to delete contact");
      console.error(err);
    } finally {
      setDeleteContact(null);
    }
  };

  const handleSendReply = async () => {
    if (!selectedContact || !replyMessage.trim()) return;

    setIsSending(true);
    try {
      await contactApiService.replyToContact(selectedContact.id, replyMessage);

      toast.success("Reply sent successfully");
      setIsOpen(false);
      setReplyMessage("");

      setContacts(
        contacts.map((contact) =>
          contact.id === selectedContact.id
            ? { ...contact, isReplied: true }
            : contact
        )
      );
    } catch (error) {
      toast.error("Failed to send reply");
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Câu hỏi thắc mắc</h1>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên người gửi</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Câu hỏi</TableHead>
                  <TableHead>Ngày gửi</TableHead>
                  <TableHead className="w-[100px]">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell className="font-medium">
                      {contact.fullName}
                    </TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell className="max-w-[300px] truncate">
                      {contact.message}
                    </TableCell>
                    <TableCell>
                      {format(new Date(contact.created_at), "dd/MM/yyyy HH:mm")}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleView(contact)}
                        >
                          Xem
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteContact(contact)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* View Contact Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Contact Message Details</DialogTitle>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-6">
              {/* Thông tin liên hệ */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-500">Tên người gửi</h3>
                  <p className="mt-1">{selectedContact.fullName}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">Email</h3>
                  <p className="mt-1">{selectedContact.email}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">Câu hỏi</h3>
                  <p className="mt-1 whitespace-pre-line bg-gray-50 p-3 rounded">
                    {selectedContact.message}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">Ngày gửi</h3>
                  <p className="mt-1">
                    {format(new Date(selectedContact.created_at), "PPpp")}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium text-gray-700 mb-2">
                  Phản hồi của bạn
                </h3>
                <Textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Type your reply here..."
                  className="min-h-[120px]"
                />
                <div className="flex justify-end mt-4">
                  <Button
                    onClick={handleSendReply}
                    disabled={!replyMessage.trim() || isSending}
                  >
                    {isSending ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Gửi phản hồi
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteContact}
        onOpenChange={(open) => !open && setDeleteContact(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xóa câu hỏi</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc muốn xóa câu hỏi từ{" "}
              <span className="font-semibold">{deleteContact?.fullName}</span>?
              Hành động này không thể hoàn tác
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setDeleteContact(null)}>
              Hủy
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Xóa
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default ContactManagement;
