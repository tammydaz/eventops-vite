import { useState } from 'react';
import {
  useBase,
  useRecords,
  useGlobalConfig,
  Box,
  Button,
  FormField,
  Input,
  Text,
  Heading,
  Select,
  SelectButtons,
  Icon,
  colors,
} from '@airtable/blocks/ui';
import { FieldType } from '@airtable/blocks/models';
import type { Record as AirtableRecord } from '@airtable/blocks/models';

/**
 * EventOps BEO Form Application
 * 
 * This is a production-ready Airtable block demonstrating:
 * - Accessing Airtable base and tables
 * - Using Airtable's custom UI components
 * - Basic form input handling
 * - Component structure best practices
 */

interface EventFormData {
  eventName: string;
  venue: string;
  eventDate: string;
  guestCount: string;
  notes: string;
}

export default function App() {
  const base = useBase();
  const globalConfig = useGlobalConfig();

  // State for form inputs
  const [formData, setFormData] = useState<EventFormData>({
    eventName: '',
    venue: '',
    eventDate: '',
    guestCount: '',
    notes: '',
  });

  const [selectedTableId, setSelectedTableId] = useState<string | null>(
    globalConfig.get('selectedTableId') as string | null
  );

  const [selectedView, setSelectedView] = useState<'list' | 'form'>('list');

  // Get the selected table
  const table = selectedTableId ? base.getTableByIdIfExists(selectedTableId) : null;

  // Get records from the selected table 
  // Type assertion needed as useRecords has strict overloads
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recordsData = useRecords(table as any);
  const records: AirtableRecord[] = Array.isArray(recordsData) ? recordsData : [];

  // Get available tables
  const tables = base.tables;

  // Handle form input changes
  const handleInputChange = (field: keyof EventFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle table selection
  const handleTableSelect = (tableId: string | number | boolean | undefined | null) => {
    if (tableId && typeof tableId === 'string') {
      setSelectedTableId(tableId);
      globalConfig.setAsync('selectedTableId', tableId);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!table) {
      // NOTE: In production, consider using Airtable's Dialog component instead of alert
      alert('Please select a table first');
      return;
    }

    if (!formData.eventName) {
      // NOTE: In production, consider using Airtable's Dialog component instead of alert
      alert('Event name is required');
      return;
    }

    try {
      // Create a new record in the selected table
      const fields: { [key: string]: unknown } = {};
      
      // Map form fields to table fields (if they exist)
      const nameField = table.fields.find(f => f.name === 'Name');
      if (nameField) {
        fields[nameField.id] = formData.eventName;
      }

      const notesField = table.fields.find(f => 
        f.name === 'Notes' && f.type === FieldType.MULTILINE_TEXT
      );
      if (notesField && formData.notes) {
        fields[notesField.id] = formData.notes;
      }

      await table.createRecordAsync(fields);

      // Reset form
      setFormData({
        eventName: '',
        venue: '',
        eventDate: '',
        guestCount: '',
        notes: '',
      });

      // Switch to list view to show the new record
      setSelectedView('list');

      // NOTE: In production, consider using Airtable's Dialog component instead of alert
      alert('Event created successfully!');
    } catch (error) {
      console.error('Error creating record:', error);
      // NOTE: In production, consider using Airtable's Dialog component instead of alert
      alert('Failed to create event. Please check your permissions and try again.');
    }
  };

  return (
    <Box padding={3} backgroundColor="lightGray1" height="100vh" overflow="auto">
      <Box marginBottom={3}>
        <Heading size="xlarge">🍽️ EventOps BEO Form</Heading>
        <Text textColor="light" marginTop={1}>
          Banquet Event Order management for event operations
        </Text>
      </Box>

      {/* Table Selection */}
      <Box
        backgroundColor="white"
        padding={3}
        borderRadius="default"
        marginBottom={3}
        border="thick"
        borderColor="lightGray2"
      >
        <FormField label="Select Table" marginBottom={0}>
          <Select
            value={selectedTableId || ''}
            onChange={value => handleTableSelect(value)}
            options={tables.map(t => ({ value: t.id, label: t.name }))}
            width="100%"
          />
        </FormField>
      </Box>

      {table && (
        <>
          {/* View Toggle */}
          <Box marginBottom={3}>
            <SelectButtons
              value={selectedView}
              onChange={newValue => setSelectedView(newValue as 'list' | 'form')}
              options={[
                { value: 'list', label: 'View Events' },
                { value: 'form', label: 'Create Event' },
              ]}
              width="100%"
            />
          </Box>

          {/* List View */}
          {selectedView === 'list' && (
            <Box
              backgroundColor="white"
              padding={3}
              borderRadius="default"
              border="thick"
              borderColor="lightGray2"
            >
              <Heading size="small" marginBottom={2}>
                Events in {table.name}
              </Heading>

              {records.length > 0 ? (
                <Box>
                  {records.map((record: AirtableRecord) => (
                    <Box
                      key={record.id}
                      padding={2}
                      marginBottom={2}
                      backgroundColor="lightGray1"
                      borderRadius="default"
                      display="flex"
                      alignItems="center"
                    >
                      <Icon name="check" size={16} fillColor={colors.GREEN} marginRight={2} />
                      <Text fontWeight="strong">
                        {record.getCellValueAsString('Name') || 'Unnamed Event'}
                      </Text>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Box padding={3} textAlign="center">
                  <Text textColor="light">
                    No events found. Click &ldquo;Create Event&rdquo; to add your first event.
                  </Text>
                </Box>
              )}
            </Box>
          )}

          {/* Form View */}
          {selectedView === 'form' && (
            <Box
              backgroundColor="white"
              padding={3}
              borderRadius="default"
              border="thick"
              borderColor="lightGray2"
            >
              <Heading size="small" marginBottom={3}>
                Create New Event
              </Heading>

              <FormField label="Event Name *" marginBottom={2}>
                <Input
                  value={formData.eventName}
                  onChange={e => handleInputChange('eventName', e.target.value)}
                  placeholder="Enter event name..."
                />
              </FormField>

              <FormField label="Venue" marginBottom={2}>
                <Input
                  value={formData.venue}
                  onChange={e => handleInputChange('venue', e.target.value)}
                  placeholder="Enter venue name..."
                />
              </FormField>

              <FormField label="Event Date" marginBottom={2}>
                <Input
                  type="date"
                  value={formData.eventDate}
                  onChange={e => handleInputChange('eventDate', e.target.value)}
                />
              </FormField>

              <FormField label="Guest Count" marginBottom={2}>
                <Input
                  type="number"
                  value={formData.guestCount}
                  onChange={e => handleInputChange('guestCount', e.target.value)}
                  placeholder="Number of guests..."
                />
              </FormField>

              <FormField label="Notes" marginBottom={3}>
                <Input
                  value={formData.notes}
                  onChange={e => handleInputChange('notes', e.target.value)}
                  placeholder="Additional notes..."
                />
              </FormField>

              <Box display="flex" justifyContent="space-between">
                <Button
                  onClick={() => setSelectedView('list')}
                  variant="secondary"
                  icon="chevronLeft"
                >
                  Back to List
                </Button>
                <Button
                  onClick={handleSubmit}
                  variant="primary"
                  icon="plus"
                  disabled={!formData.eventName}
                >
                  Create Event
                </Button>
              </Box>
            </Box>
          )}
        </>
      )}

      {!table && (
        <Box
          backgroundColor="white"
          padding={4}
          borderRadius="default"
          border="thick"
          borderColor="lightGray2"
          textAlign="center"
        >
          <Icon name="cog" size={48} fillColor={colors.GRAY} marginBottom={2} />
          <Text textColor="light" size="large">
            Select a table above to get started
          </Text>
        </Box>
      )}
    </Box>
  );
}
