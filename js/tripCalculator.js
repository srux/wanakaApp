   // Conditional logic

            $(function(){

                var picker = new Lightpick({ field: document.getElementById('datepicker'),
                singleDate: false,
                repick: true,
                selectForward: true,
                minDays: 1,
                maxDays: 15,
                onSelect: function(start, end){

                var str = '';
                str += start ? start.format('Do MMMM YYYY') + ' to ' : '';
                str += end ? end.format('Do MMMM YYYY') : '...';
                document.getElementById('daysTravel').innerHTML = str;
    
                var iDaysOrig = 1;
                var now = moment(start); //
                var end = moment(end); // 
                var duration = moment.duration(end.diff(now));
                var iDaysNum = duration.asDays() + iDaysOrig;

                document.getElementById('daysTravelling').innerHTML = iDaysNum;

                    if (iDaysNum>0 ){
                        $('.formPeeps').removeClass('formboxHidden');
                    }
                    if (iDaysNum>10 ){
                        $('#labelPeople1').addClass('buttonHidden');
                    }
                    else {
                        $('#labelPeople1').removeClass('buttonHidden');
                    }
                    
                    
                }
                });
                $('.form1').click(function() {
                var iPeeps = $('input[name=numberPeople]:checked').val(); 
                var iDays = document.getElementById("daysTravelling").innerHTML;
                
                console.log(iPeeps);
                console.log(iDays);
    
    
                if (iPeeps<2 && iDays<6 ){
                    $('#motorbike').addClass('buttonShow');
                    $('#motorbike').removeClass('buttonHidden');
                }
                 else {
                    $('#motorbike').removeClass('buttonShow');
                    $('#motorbike').addClass('buttonHidden');
                }
                if (iPeeps<3 && iDays<11 ){
                    $('#smallCar').addClass('buttonShow');
                    $('#smallCar').removeClass('buttonHidden');
                }
                else {
                    $('#smallCar').removeClass('buttonShow');
                    $('#smallCar').addClass('buttonHidden');
                }
                if (iPeeps<6 && iDays<11 && iDays>2 ){
                    $('#largeCar').addClass('buttonShow');
                    $('#largeCar').removeClass('buttonHidden');
                }
                else {
                    $('#largeCar').removeClass('buttonShow');
                    $('#largeCar').addClass('buttonHidden');
                }
                if (iPeeps>1 && iDays>1){
                    $('#motorHome').addClass('buttonShow');
                    $('#motorHome').removeClass('buttonHidden');
                }
                else {
                    $('#motorHome').removeClass('buttonShow');
                    $('#motorHome').addClass('buttonHidden');
                }
                if (iDays>0 ){
                    $('.formPeeps').removeClass('formboxHidden');
                }
                if (iPeeps>0 && iDays>0 ){
                    $('.b1').removeClass('nextButtonHidden');
                }
            }).click();
    });

    // Costs of travel & Payment Total


    $('.form3').click(function() {
               var iDaysTravel = document.getElementById("daysTravelling").innerHTML;
               var iDayCost = $('input[name=vehicle]:checked').val();  
               var iTravelCost = (iDaysTravel * iDayCost);

               document.getElementById('totalCost').innerHTML = iTravelCost;
               document.getElementById('dayCost').innerHTML = iDayCost;

                var iTotalPayment = (iTravelCost);
                $('#totalPayment').val(iTotalPayment);

                
               console.log('Day Cost',iDayCost);
               console.log('Days Travel',iDaysTravel);
               console.log('Total Cost',iTravelCost);
               console.log('Payment Cost',iTotalPayment);

               


               
            }).click();

            $('.b4').click(function() {

                var iFuelCons = $('input[name=vehicleClass]:checked').val();
                var iDistTravelled = document.getElementById("distance").innerHTML;
                var iPerRaw = ((iDistTravelled) * (iFuelCons));
                var iPerKm = iPerRaw.toFixed(2);
                document.getElementById('fuelCons').innerHTML = iPerKm;
                console.log('Distance Travelled',iDistTravelled);
                console.log('Fuel Economy',iPerKm);
                
                
             }).click();