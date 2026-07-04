import { useEffect, useState } from "react";
import { Package } from "lucide-react";
import toast from 'react-hot-toast';

import equipmentApi from "../api/equipmentApi";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import DashboardCards from "../components/dashboard/DashboardCards";
import EquipmentTable from "../components/equipment/EquipmentTable";
import EquipmentTableSkeleton from "../components/equipment/EquipmentTableSkeleton";
import EquipmentForm from "../components/equipment/EquipmentForm";
import Modal from "../components/common/Modal";
import ConfirmDialog from "../components/common/ConfirmDialog";

function Dashboard() {
  // Equipment List
  const [equipment, setEquipment] = useState([]);

  // Search & Filters
  const [filters, setFilters] = useState({
    search: "",
    type: "",
    status: "",
  });

  // Debounced filters for API calls
  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  // Loading State
  const [loading, setLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Selected Equipment (null = Add Mode)
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 300); // Reduced to 300ms for faster response

    return () => clearTimeout(timer);
  }, [filters]);

  // Fetch Equipment
  const fetchEquipment = async () => {
    try {
      setLoading(true);

      const response = await equipmentApi.getAllEquipment(debouncedFilters);

      setEquipment(response.data.data);
    } catch (error) {
      console.error("Error fetching equipment:", error);
    } finally {
      setLoading(false);
      setIsInitialLoad(false);
    }
  };

  // Fetch whenever debounced filters change
  useEffect(() => {
    fetchEquipment();
  }, [debouncedFilters]);

  // Handle Search & Filter Changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Reset Filters
  const handleReset = () => {
    setFilters({
      search: "",
      type: "",
      status: "",
    });
  };

  // Add Equipment
  const handleAddEquipment = () => {
    setSelectedEquipment(null);
    setIsModalOpen(true);
  };

  // Edit Equipment
  const handleEdit = (equipment) => {
    setSelectedEquipment(equipment);
    setIsModalOpen(true);
  };

  // Delete (Next Step)
  const handleDelete = (equipment) => {
    setSelectedEquipment(equipment);
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await equipmentApi.deleteEquipment(selectedEquipment.id);

      toast.success('Equipment deleted successfully!');

      await fetchEquipment();

      setIsDeleteOpen(false);

      setSelectedEquipment(null);
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error('Failed to delete equipment. Please try again.');
    }
  };

  // Form Submit
  const handleSubmit = async (formData) => {
    try {
      if (selectedEquipment) {
        // Update existing equipment
        await equipmentApi.updateEquipment(selectedEquipment.id, formData);
        toast.success('Equipment updated successfully!');
      } else {
        // Create new equipment
        await equipmentApi.createEquipment(formData);
        toast.success('Equipment added successfully!');
      }

      // Refresh the equipment list
      await fetchEquipment();

      // Close the modal
      setIsModalOpen(false);
      setSelectedEquipment(null);
    } catch (error) {
      console.error("Save failed:", error);
      toast.error('Failed to save equipment. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Dashboard Statistics */}
        <DashboardCards />

        {/* Equipment Table with Integrated Search & Filters */}
        <div className="mt-8">
          {isInitialLoad ? (
            <EquipmentTableSkeleton />
          ) : (
            <EquipmentTable
              equipment={equipment}
              onEdit={handleEdit}
              onDelete={handleDelete}
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleReset}
              onAddEquipment={handleAddEquipment}
              isLoading={loading}
            />
          )}
        </div>
      </main>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedEquipment ? "Edit Equipment" : "Add Equipment"}
        subtitle={selectedEquipment ? "Update laboratory equipment information" : "Add new equipment to the inventory"}
        icon={<Package className="w-6 h-6 text-slate-600" />}
        badge={selectedEquipment ? "Editing" : "New"}
      >
        <EquipmentForm
          equipment={selectedEquipment}
          onSubmit={handleSubmit}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
      <ConfirmDialog
        isOpen={isDeleteOpen}
        title="Delete Equipment"
        message={`Are you sure you want to delete "${selectedEquipment?.name}"?`}
        onCancel={() => {
          setIsDeleteOpen(false);
          setSelectedEquipment(null);
        }}
        onConfirm={confirmDelete}
      />
      <Footer />
    </div>
  );
}

export default Dashboard;
