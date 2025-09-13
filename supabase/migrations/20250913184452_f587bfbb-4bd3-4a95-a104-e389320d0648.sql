-- Update salaries to monthly instead of hourly for Kenya market
UPDATE jobs 
SET salary = CASE 
  WHEN salary = 'KSH 200/hour' THEN 'KSH 35,000/month'
  WHEN salary = 'KSH 220/hour' THEN 'KSH 38,000/month'
  WHEN salary = 'KSH 280/hour + fuel allowance' THEN 'KSH 45,000/month + fuel allowance'
  ELSE salary
END
WHERE salary LIKE '%/hour%';