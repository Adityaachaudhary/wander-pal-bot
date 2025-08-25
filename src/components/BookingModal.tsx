import { useState } from 'react';
import { X, Calendar, Users, CreditCard, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    id: string;
    title?: string;
    name?: string;
    price?: number;
    price_per_night?: number;
    type: 'trip' | 'hotel';
    city?: string;
  };
}

const BookingModal = ({ isOpen, onClose, item }: BookingModalProps) => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    guests: '2',
    checkIn: '',
    checkOut: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getTotalPrice = () => {
    const basePrice = item.price || item.price_per_night || 0;
    const guests = parseInt(bookingData.guests) || 1;
    return basePrice * guests;
  };

  const handleInputChange = (field: string, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleBooking = async () => {
    setIsProcessing(true);
    
    // Simulate booking process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsConfirmed(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsConfirmed(false);
      setStep(1);
      onClose();
    }, 3000);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-6">
      {[1, 2, 3].map((stepNumber) => (
        <div key={stepNumber} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              stepNumber <= step
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {stepNumber}
          </div>
          {stepNumber < 3 && (
            <div
              className={`w-12 h-0.5 mx-2 ${
                stepNumber < step ? 'bg-primary' : 'bg-muted'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  if (isConfirmed) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Booking Confirmed!</h3>
            <p className="text-muted-foreground mb-4">
              Your booking for {item.title || item.name} has been confirmed.
            </p>
            <Badge variant="outline" className="text-green-600 border-green-600">
              Booking ID: BK{Date.now().toString().slice(-6)}
            </Badge>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Book {item.title || item.name}
          </DialogTitle>
        </DialogHeader>

        {renderStepIndicator()}

        {/* Step 1: Trip Details */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="bg-card rounded-lg p-4 border">
              <h3 className="font-semibold mb-2">{item.title || item.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{item.city}</p>
              <div className="text-lg font-bold text-primary">
                {formatPrice(item.price || item.price_per_night || 0)}
                {item.type === 'hotel' && <span className="text-sm font-normal"> per night</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="guests">Number of Guests</Label>
                <Select value={bookingData.guests} onValueChange={(value) => handleInputChange('guests', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} Guest{num > 1 ? 's' : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="checkIn">Check-in Date</Label>
                <Input
                  type="date"
                  value={bookingData.checkIn}
                  onChange={(e) => handleInputChange('checkIn', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="checkOut">
                {item.type === 'hotel' ? 'Check-out Date' : 'Return Date'}
              </Label>
              <Input
                type="date"
                value={bookingData.checkOut}
                onChange={(e) => handleInputChange('checkOut', e.target.value)}
                min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
              />
            </div>

            <Button onClick={handleNextStep} className="w-full" disabled={!bookingData.checkIn || !bookingData.checkOut}>
              Continue to Guest Details
            </Button>
          </div>
        )}

        {/* Step 2: Guest Details */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  value={bookingData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  value={bookingData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                type="email"
                value={bookingData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter email address"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                value={bookingData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter phone number"
              />
            </div>

            <div>
              <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
              <Input
                value={bookingData.specialRequests}
                onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                placeholder="Any special requests or requirements"
              />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={handlePrevStep} className="flex-1">
                Back
              </Button>
              <Button 
                onClick={handleNextStep} 
                className="flex-1"
                disabled={!bookingData.firstName || !bookingData.lastName || !bookingData.email || !bookingData.phone}
              >
                Continue to Payment
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <div className="space-y-6">
            {/* Booking Summary */}
            <div className="bg-card rounded-lg p-4 border">
              <h3 className="font-semibold mb-4">Booking Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>{item.title || item.name}</span>
                  <span>{formatPrice(item.price || item.price_per_night || 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Guests</span>
                  <span>{bookingData.guests}</span>
                </div>
                <div className="flex justify-between">
                  <span>Dates</span>
                  <span>{bookingData.checkIn} to {bookingData.checkOut}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
              </div>
            </div>

            {/* Mock Payment Form */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="h-5 w-5" />
                <span className="font-semibold">Demo Payment</span>
              </div>
              <p className="text-sm opacity-90 mb-4">
                This is a demo booking system. No actual payment will be processed.
              </p>
              <div className="bg-white/10 rounded p-3">
                <p className="text-xs opacity-75">Mock Card: **** **** **** 1234</p>
                <p className="text-xs opacity-75">Status: Ready for demo booking</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={handlePrevStep} className="flex-1">
                Back
              </Button>
              <Button 
                onClick={handleBooking} 
                className="flex-1 travel-gradient-accent text-white border-0"
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : `Confirm Booking - ${formatPrice(getTotalPrice())}`}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;